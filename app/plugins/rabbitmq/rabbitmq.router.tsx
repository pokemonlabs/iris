import { parse } from "cookie";
import { z } from 'zod';
import { Trpc } from '~/core/trpc/base';
import Pusher from 'pusher'
import { zodResponseFormat } from "openai/helpers/zod.mjs";


var pusher = new Pusher({
  appId: "1924168",
  key: "4801420944db61b44651",
  secret: "1c24284a08450f77ea40",
  cluster: "ap2",
  useTLS: true
});




async function makeRequest(url: string, options: RequestInit) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(process.env.RABBITMQ_CREDENTIALS).toString('base64')}`,
  })

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const RabbitMQRouter = Trpc.createRouter({
  pushJob: Trpc.procedure
    .input(
      z.object({
        testRunId: z.string(),
        url: z.string(),
        message: z.string(),
        conversation_id: z.string(),
        custom_system_prompt: z.string().optional(),
        only_n_most_recent_images: z.number().optional(),
        agentId: z.string(),
        cookies: z.record(z.string(), z.string()).optional(), // Cookies as key-value pairs
        session: z.record(z.string(), z.string()).optional(), // Session data as key-value pairs
        localStorage: z.record(z.string(), z.string()).optional(), // LocalStorage data as key-value pairs
        useUserDataDirectory: z.boolean().optional(),
      }))
    .mutation(async ({ input, ctx }) => {
      // following is the created by id, not ai agent
      const agentId = input.agentId;

      const cookieHeader = parse(ctx.request.headers.get('Cookie') || '');
      const agent = await ctx.database.agent.findFirst({
        where: {
          isActive: true,
        },
      });

      if (!agent) {
        throw new Error('Cannot find the agent to run the job, please try adding an agent');
      }

      const jobData = {
        ...input,
        ...agent,
        access_token: cookieHeader.IRIS_ACCESS_TOKEN,
        api_key: agent.apiKey || agent.anthropicApiKey,
        userId: ctx.session.user.id,
        createdAt: new Date(),
      };

      // Publish message to queue
      await makeRequest(`${process.env.RABBITMQ_API_BASE}/exchanges/${process.env.RABBITMQ_VHOST}/amq.default/publish`, {
        method: 'POST',
        body: JSON.stringify({
          payload: JSON.stringify(jobData),
          payload_encoding: 'string',
          routing_key: process.env.RABBITMQ_QUEUE_NAME,
          properties: {
            delivery_mode: 2,
            headers: {},
          },
        }),
      });

      return { success: true };
    }),

  getJobs: Trpc.procedure.query(async ({ ctx }) => {
    // Get messages from queue
    const response = await makeRequest(`${process.env.RABBITMQ_API_BASE}/queues/${process.env.RABBITMQ_VHOST}/${process.env.RABBITMQ_QUEUE_NAME}/get`, {
      method: 'POST',
      body: JSON.stringify({
        count: 50,
        ack_mode: 'reject_requeue_true',
        encoding: 'auto',
        truncate: 50000
      }),
    })

    // Filter messages for current user
    return response
      .map((msg: any) => JSON.parse(msg.payload))
      .filter((jobData: any) => jobData.userId === ctx.session.user.id)
  }),

  pushOtpToPusher: Trpc.procedure.input(
    z.object({
      otp: z.number(),
    }),
  )    .mutation(async ({ input, ctx }) => {
    // Get one message
    await pusher.trigger("channel", "otp-response", { otp: input.otp });
    return { success: true }
  }),

  deleteJob: Trpc.procedure
    .input(
      z.object({
        jobId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Get one message
      const response = await makeRequest(`${process.env.RABBITMQ_API_BASE}/queues/${process.env.RABBITMQ_VHOST}/${process.env.RABBITMQ_QUEUE_NAME}/get`, {
        method: 'POST',
        body: JSON.stringify({
          count: 1,
          ack_mode: 'reject_requeue_false',
          encoding: 'auto',
          truncate: 50000
        }),
      })

      if (response.length > 0) {
        const jobData = JSON.parse(response[0].payload)
        if (jobData.userId === ctx.session.user.id) {
          return { success: true }
        }
      }

      return { success: false }
    }),
})
