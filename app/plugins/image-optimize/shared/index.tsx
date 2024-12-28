import sharp from 'sharp'

type Options = {
  size?: number
  quality?: number
}

const MIMETYPE_SUPPORTED = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/svg+xml',
]

const compressFile = async (
  file: File,
  options: Options = { quality: 70 },
): Promise<{ buffer: Buffer; filename: string; mimetype: string }> => {
  try {
    const isSupported = MIMETYPE_SUPPORTED.includes(file.type)

    const arrayBuffer = await file.arrayBuffer()

    if (!isSupported) {
      return {
        buffer: Buffer.from(arrayBuffer),
        filename: file.name,
        mimetype: file.type,
      }
    }

    const buffer = await compressArrayBuffer(arrayBuffer, options)

    const filename = rename(file.name)

    return { buffer, mimetype: 'image/webp', filename }
  } catch (error) {
    throw new Error(`Could not compress image: ${error.message}`)
  }
}

const compressArrayBuffer = async (
  arrayBuffer: ArrayBuffer,
  options: Options = { quality: 70 },
) => {
  try {
    const { size, quality } = options
    const buffer = Buffer.from(arrayBuffer)

    const image = sharp(buffer)
    const { height, width } = await image.metadata()

    const sizeBuilt = size ?? width > height ? width : height

    const bufferCompressed: Buffer = await sharp(buffer)
      .resize(sizeBuilt)
      .webp({ quality, effort: 6 })
      .toBuffer()

    return bufferCompressed
  } catch (error) {
    throw new Error(`Could not compress image: ${error.message}`)
  }
}

const rename = (name: string = '') => {
  if (name.includes('.')) {
    const nameWithoutExtension = name.split('.').slice(-1).join('.')

    return `${nameWithoutExtension}.webp`
  }

  return `${name}.webp`
}

export const ImageOptimizeShared = {
  compressFile,
  compressArrayBuffer,
}
