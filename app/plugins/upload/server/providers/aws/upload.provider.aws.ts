import { DateHelper } from '@/core/helpers/date'
import { Utility } from '@/core/helpers/utility'
import {
  GetObjectCommand,
  HeadObjectCommand,
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import axios, { AxiosRequestConfig } from 'axios'
import {
  FromPrivateToPublicUrlOptions,
  GetSignedUrlOptions,
  GetSignedUrlReturn,
  UploadPrivateOptions,
  UploadPrivateReturn,
  UploadProvider,
  UploadPublicOptions,
  UploadPublicReturn,
} from '../upload.provider'

const ONE_HOUR_IN_SECONDS = 60 * 60

type Bucket = {
  dateCreation: Date
  name: string
}

type Credentials = {
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
  expiration: Date
}

type CredentialsResponse = {
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
  expiration: string
  bucketNamePrivate: string
  bucketNamePublic: string
  bucketKey: string
}

export class UploadProviderAws extends UploadProvider {
  private static isIrisInitialised: boolean = false

  private client: S3Client
  private bucketNamePublic: string
  private bucketNamePrivate: string
  private region: string
  private credentials: Credentials
  private irisApiKey: string
  private bucketKey: string

  private httpClient = axios.create()

  private httpClientOptions: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  public async initialise() {
    this.region = process.env.SERVER_UPLOAD_AWS_REGION

    if (Utility.isNull(this.region)) {
      this.region = 'us-west-1'
    }

    try {
      this.irisApiKey = process.env.SERVER_UPLOAD_IRIS_API_KEY

      if (Utility.isDefined(this.irisApiKey)) {
        if (UploadProviderAws.isIrisInitialised) {
          return
        }

        await this.initializeWithIris()

        console.log(`AWS library (Iris) active in region ${this.region}`)

        UploadProviderAws.isIrisInitialised = true

        return
      }
    } catch (error) {
      console.warn(`AWS library (Iris) failed to start: ${error.message}`)
    }

    try {
      const accessKey = process.env.SERVER_UPLOAD_AWS_ACCESS_KEY

      const secretKey = process.env.SERVER_UPLOAD_AWS_SECRET_KEY

      if (!accessKey && !secretKey) {
        throw new Error(
          'Set SERVER_UPLOAD_AWS_ACCESS_KEY && SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate',
        )
      }

      if (!accessKey) {
        throw new Error(
          'Set SERVER_UPLOAD_AWS_ACCESS_KEY in your .env to activate',
        )
      }

      if (!secretKey) {
        throw new Error(
          'Set SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate',
        )
      }

      this.bucketNamePublic = process.env.SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME

      if (!this.bucketNamePublic) {
        console.warn(
          `Set SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME in your .env to activate a public bucket with infinite urls`,
        )
      }

      this.bucketNamePrivate = process.env.SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME

      if (!this.bucketNamePrivate) {
        console.warn(
          `Set SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME in your .env to activate a private bucket with signed urls`,
        )
      }

      this.client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey,
        },
      })

      await this.check()

      console.log(`AWS library active in region ${this.region}`)
    } catch (error) {
      console.warn(`AWS library failed to start`)

      throw new Error(error)
    }
  }

  private async initializeWithIris() {
    const url = `/v1/addons/upload/create-credentials`

    this.setApiKey(this.irisApiKey)

    const response = await this.postIris<CredentialsResponse>(url)

    this.bucketNamePrivate = response.bucketNamePrivate
    this.bucketNamePublic = `${response.bucketNamePublic}`

    this.credentials = {
      accessKeyId: response.accessKeyId,
      secretAccessKey: response.secretAccessKey,
      sessionToken: response.sessionToken,
      expiration: new Date(response.expiration),
    }

    this.bucketKey = response.bucketKey

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.credentials.accessKeyId,
        secretAccessKey: this.credentials.secretAccessKey,
        sessionToken: this.credentials.sessionToken,
      },
    })

    await this.check()
  }

  private async ensureCredentials() {
    if (!UploadProviderAws.isIrisInitialised) {
      return
    }

    if (this.areCredentialsValid()) {
      return
    }

    const url = `/v1/addons/upload/refresh-credentials`

    this.setApiKey(this.irisApiKey)

    const response = await this.postIris<CredentialsResponse>(url)

    this.credentials = {
      accessKeyId: response.accessKeyId,
      secretAccessKey: response.secretAccessKey,
      sessionToken: response.sessionToken,
      expiration: new Date(response.expiration),
    }

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.credentials.accessKeyId,
        secretAccessKey: this.credentials.secretAccessKey,
        sessionToken: this.credentials.sessionToken,
      },
    })

    await this.check()
  }

  private areCredentialsValid(): boolean {
    const isTokenDefined = Utility.isDefined(this.credentials)

    const isTokenValid =
      isTokenDefined &&
      DateHelper.isBefore(DateHelper.getNow(), this.credentials.expiration)

    return isTokenValid
  }

  private async check(): Promise<void> {
    const buckets = await this.listBuckets()

    if (this.bucketNamePrivate) {
      console.log(`Checking bucket "${this.bucketNamePrivate}"...`)

      const bucket = buckets.find(
        bucket => bucket.name === this.bucketNamePrivate,
      )

      if (bucket) {
        console.log(`Bucket "${this.bucketNamePrivate}" is active`)
      } else {
        throw new Error(`Bucket "${this.bucketNamePrivate}" was not found`)
      }
    }

    if (this.bucketNamePublic) {
      console.log(`Checking bucket "${this.bucketNamePublic}"...`)

      const bucket = buckets.find(
        bucket => bucket.name === this.bucketNamePublic,
      )

      if (bucket) {
        console.log(`Bucket "${this.bucketNamePublic}" is active`)
      } else {
        throw new Error(`Bucket "${this.bucketNamePublic}" was not found`)
      }
    }
  }

  public async uploadPublic(
    options: UploadPublicOptions,
  ): Promise<UploadPublicReturn> {
    await this.ensureCredentials()

    const { file } = options

    let key = this.ensureFilename(file.name)

    key = this.ensureKey(key)

    const command = new PutObjectCommand({
      Bucket: `${this.bucketNamePublic}`,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    try {
      await this.client.send(command)

      console.log(`File ${file.name} saved (public)`)

      const url = `${this.getBaseUrlPublic()}/${key}`

      return { url }
    } catch (error) {
      console.error(`${error}`)
      throw new Error(`Could not upload public file with key "${key}"`)
    }
  }

  public async uploadPrivate(
    options: UploadPrivateOptions,
  ): Promise<UploadPrivateReturn> {
    await this.ensureCredentials()

    const { file } = options

    const key = this.ensureFilename(file.name)

    const command = new PutObjectCommand({
      Bucket: `${this.bucketNamePrivate}`,
      Key: this.ensureKey(key),
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    try {
      await this.client.send(command)

      console.log(`File ${file.name} saved (private)`)

      const url = `${this.getBaseUrlPrivate()}/${key}`

      return { url }
    } catch (error) {
      console.error(`${error}`)
      throw new Error(`Could not upload private file with key "${key}"`)
    }
  }

  async fromPrivateToPublicUrl({
    url,
    expiresInSeconds = ONE_HOUR_IN_SECONDS,
  }: FromPrivateToPublicUrlOptions): Promise<UploadPrivateReturn> {
    if (!this.isUrlPrivate(url)) {
      throw new Error(`${url} must be a private url`)
    }

    await this.ensureCredentials()

    const key = this.extractKeyFromUrlPrivate(url)

    const params = {
      Bucket: `${this.bucketNamePrivate}`,
      Key: this.ensureKey(key),
    }

    const command = new GetObjectCommand(params)

    const urlPublic = await getSignedUrl(this.client, command, {
      expiresIn: expiresInSeconds,
    })

    return { url: urlPublic }
  }

  async getSignedUrl(
    options: GetSignedUrlOptions,
  ): Promise<GetSignedUrlReturn> {
    const { key, lifetimeSeconds = ONE_HOUR_IN_SECONDS } = options

    const keyCleaned = this.ensureKey(key)

    const params = {
      Bucket: `${this.bucketNamePrivate}`,
      Key: keyCleaned,
    }

    const headCommand = new HeadObjectCommand(params)
    try {
      await this.client.send(headCommand)
    } catch (error) {
      if (error.name === 'NotFound') {
        return null
      } else {
        throw new Error(`Error in checking object existence: ${error}`)
      }
    }

    const command = new GetObjectCommand(params)
    try {
      const url = await getSignedUrl(this.client, command, {
        expiresIn: lifetimeSeconds,
      })

      return { url }
    } catch (error) {
      throw new Error(`Error in getting signed url:${error}`)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   PRIVATE                                  */
  /* -------------------------------------------------------------------------- */

  private async listBuckets(): Promise<Bucket[]> {
    const result = await this.client.send(new ListBucketsCommand({}))

    const buckets = result.Buckets.map(item => ({
      name: item.Name,
      dateCreation: item.CreationDate,
    }))

    return buckets
  }

  private getBaseUrlPrivate(): string {
    return `https://${this.bucketNamePrivate}.s3.${this.region}.amazonaws.com`
  }

  private getBaseUrlPublic(): string {
    return `https://${this.bucketNamePublic}.s3.${this.region}.amazonaws.com`
  }

  private ensureKey(key: string): string {
    let keyClean = key

    const isPrefixedSlash = keyClean.startsWith('/')

    if (isPrefixedSlash) {
      keyClean = keyClean.slice(1)
    }

    const isPrefixedBucketKey = keyClean.startsWith(this.bucketKey)

    if (!isPrefixedBucketKey) {
      keyClean = `${this.bucketKey}/${keyClean}`
    }

    return keyClean
  }

  private isUrlPrivate(url: string): boolean {
    const baseUrlPrivate = this.getBaseUrlPrivate()

    const isPrivate = url.startsWith(baseUrlPrivate)

    return isPrivate
  }

  private extractKeyFromUrlPrivate(url: string): string {
    const baseUrlPrivate = this.getBaseUrlPrivate()

    return url.replace(baseUrlPrivate, '')
  }

  private setApiKey(apiKey: string) {
    this.httpClientOptions.headers['Authorization'] = apiKey
    this.httpClientOptions['credentials'] = 'include'
  }

  private async postIris<ReturnType>(url: string) {
    const baseUrl = this.getDashboardBaseUrl()

    const response = await this.httpClient
      .post<ReturnType>(`${baseUrl}${url}`, {}, this.httpClientOptions)
      .catch(error => {
        console.error(error)
        throw new Error(`Could not post to ${url}`)
      })

    return response.data
  }

  private getDashboardBaseUrl() {
    return `https://api.iris.dev/api`
  }
}
