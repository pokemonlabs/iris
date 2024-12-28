import { parse } from "cookie";
import { z } from 'zod';
import { Trpc } from '~/core/trpc/base';

const API_BASE = 'https://fuji.lmq.cloudamqp.com/api'
const CREDENTIALS = 'tjvlzief:beDk8uRGm8JyR1Bb7bvbM4fgxXlq2EGF'
const QUEUE_NAME = 'task_queue_2'
const VHOST = 'tjvlzief'

async function makeRequest(url: string, options: RequestInit) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(CREDENTIALS).toString('base64')}`,
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
      await makeRequest(`${API_BASE}/exchanges/${VHOST}/amq.default/publish`, {
        method: 'POST',
        body: JSON.stringify({
          payload: JSON.stringify(jobData),
          payload_encoding: 'string',
          routing_key: QUEUE_NAME,
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
    const response = await makeRequest(`${API_BASE}/queues/${VHOST}/${QUEUE_NAME}/get`, {
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

  deleteJob: Trpc.procedure
    .input(
      z.object({
        jobId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Get one message
      const response = await makeRequest(`${API_BASE}/queues/${VHOST}/${QUEUE_NAME}/get`, {
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