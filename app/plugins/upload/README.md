# Upload Plugin

The Upload plugin integrates with AWS S3 to provide file storage functionalities.

Note: If AWS environment variables are not defined, the plugin defaults to your server disk.

## Client

Use the upload hooks for client-side functionalities.

### Upload a public file

```tsx
import { useUploadPublic } from '@/plugins/upload/client'
import { RcFile } from 'antd/es/upload'

export default function UploadSomething() {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { mutateAsync: upload } = useUploadPublic()

  const handleUpload = async () => {
    const { url } = await upload({ file: fileList[0] as RcFile })
    console.log(url)
  }

  const beforeUpload = file => {
    setFileList([...fileList, file])
  }

  return (
    <>
      <Upload fileList={fileList} beforeUpload={beforeUpload}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload}>
        Start Upload
      </Button>
    </>
  )
}
```

### Upload a private file

```tsx
import { useUploadPublic } from '@/plugins/upload/client'
import { RcFile } from 'antd/es/upload'

export default function UploadSomething() {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { mutateAsync: uploadPrivate } = useUploadPrivate()
  const { mutateAsync: fromPrivateToPublicUrl } =
    Api.upload.fromPrivateToPublicUrl.useMutation()

  const handleUpload = async () => {
    const { url } = await uploadPrivate({ file: fileList[0] as RcFile })

    const { url: urlPublic } = await fromPrivateToPublicUrl({ url })

    console.log(url) // private url that you can store in your database
    console.log(urlPublic) // public url available for 1 hour
  }

  const beforeUpload = file => {
    setFileList([...fileList, file])
  }

  return (
    <>
      <Upload fileList={fileList} beforeUpload={beforeUpload}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload}>
        Start Upload
      </Button>
    </>
  )
}
```

## Server

Use the `UploadServer.service` for server-side functionalities.

```tsx
import { UploadServer } from '@/plugins/upload'

UploadServer.service.uploadPublic(...)
UploadServer.service.uploadPrivate(...)
UploadServer.service.fromPrivateToPublicUrl(...)
```

## Environment variables

```.env
// Setup your own AWS account & buckets
SERVER_UPLOAD_AWS_ACCESS_KEY=
SERVER_UPLOAD_AWS_SECRET_KEY=
SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME=
SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME=
SERVER_UPLOAD_AWS_REGION=
```
