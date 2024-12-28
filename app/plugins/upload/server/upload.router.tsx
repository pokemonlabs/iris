import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { UploadService } from './upload.service'

export const UploadRouter = Trpc.createRouter({
  fromPrivateToPublicUrl: Trpc.procedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const response = await UploadService.fromPrivateToPublicUrl({
        url: input.url,
      })

      const url = response[0].url

      return { url }
    }),
})
