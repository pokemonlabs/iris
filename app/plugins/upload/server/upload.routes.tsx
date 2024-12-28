import { ActionFunction, json } from '@remix-run/node'
import { zfd } from 'zod-form-data'
import { AuthenticationServer } from '~/core/authentication/server'
import { ImageOptimizeShared } from '~/plugins/image-optimize/shared'
import { UploadService } from './upload.service'
import { UploadFileType } from './upload.type'

export const uploadPrivateAction: ActionFunction = async ({ request }) => {
  await AuthenticationServer.getHttpContext({ request })

  const schema = zfd.formData({
    file: zfd.file(),
  })

  try {
    const formData = await request.formData()

    const data = schema.parse({
      file: formData.get('file'),
    })

    const { buffer, mimetype, filename } =
      await ImageOptimizeShared.compressFile(data.file)

    const file: UploadFileType = {
      name: filename,
      mimetype,
      buffer: buffer,
    }

    const urls = await UploadService.uploadPrivate(file)

    return json(urls?.[0])
  } catch (error) {
    console.log(error)
    return json(`Could not upload file`, { status: 500 })
  }
}

export const uploadPublicAction: ActionFunction = async ({ request }) => {
  await AuthenticationServer.getHttpContext({ request })

  const schema = zfd.formData({
    file: zfd.file(),
  })

  try {
    const formData = await request.formData()

    const data = schema.parse({
      file: formData.get('file'),
    })

    const { buffer, mimetype, filename } =
      await ImageOptimizeShared.compressFile(data.file)

    const file: UploadFileType = {
      name: filename,
      mimetype,
      buffer: buffer,
    }

    const urls = await UploadService.uploadPublic(file)

    return json(urls?.[0])
  } catch (error) {
    console.log(error)
    return json(`Could not upload file`, { status: 500 })
  }
}
