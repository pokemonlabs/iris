import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

/**
 * @provider UploadHooks
 * @description An Upload hooks to upload one file
 * @function {({options: {file: File}) => Promise<{url: string}>} upload - Hook to upload the File to the server and return the url of the uploaded file so you can then store it
 * @usage `const {mutateAsync: upload} = useUploadPublic(); await upload({file});`
 * @import import { useUploadPublic } from '@/plugins/upload/client'
 */

type Options = { file: File }

export const useUploadPrivate = () =>
  useMutation({
    mutationFn: async ({ file }: Options): Promise<{ url: string }> => {
      const formData = new FormData()
      formData.append('file', file, file.name)

      const response = await axios.post<{ url: string }>(
        '/api/upload/private',
        formData,
      )

      return response.data
    },
  })

export const useUploadPublic = () =>
  useMutation({
    mutationFn: async ({ file }: Options): Promise<{ url: string }> => {
      const formData = new FormData()
      formData.append('file', file, file.name)

      const response = await axios.post<{ url: string }>(
        '/api/upload/public',
        formData,
      )

      return response.data
    },
  })
