# Image Optimize

This plugin compress and optimize image files to a WebP format.

## Why using WebP?

WebP is a modern image format that provides superior lossless and lossy compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster. WebP lossless images are 26% smaller in size compared to PNGs.

## Usage

```tsx
import { ImageOptimizeShared } from '~/plugins/image-optimize/shared'

const result = await ImageOptimizeShared.compressFile(file)

const { buffer, mimetype, filename } = result
```

You can also use the `Img` component which provide a useful `srcOnError` in case an url is broken.

```tsx
import { ImageOptimizedClient } from '~/plugins/image-optimize/client'

export default function Component() {
  return (
    <ImageOptimizedClient.Img
      src="your-url.png"
      srcOnError="your-url-if-the-first-one-failed"
      isPretty={true}
    />
  )
}
```

## Shared Types

### ImageOptimizeShared.compressFile

| prop      | type      | default          | description           |
| --------- | --------- | ---------------- | --------------------- |
| `file`    | `File`    |                  | The file to compress. |
| `options` | `Options` | `{ quality: 70}` |                       |

### ImageOptimizeShared.compressArrayBuffer

| prop          | type          | default          | description                  |
| ------------- | ------------- | ---------------- | ---------------------------- |
| `arrayBuffer` | `ArrayBuffer` |                  | The ArrayBuffer to compress. |
| `options`     | `Options`     | `{ quality: 70}` |                              |

### Options

| prop      | type     | default | description                             |
| --------- | -------- | ------- | --------------------------------------- |
| `size`    | `number` |         | The desired file size in pixels.        |
| `quality` | `number` | `70`    | The quality of the image from 1 to 100. |

## Client Types

### ImageOptimizedClient.Img

| prop              | type            | default | description                                                                         |
| ----------------- | --------------- | ------- | ----------------------------------------------------------------------------------- |
| `src`             | `string`        |         | The image url.                                                                      |
| `srcOnError`      | `string`        |         | The image url to show if the main one failed.                                       |
| `isPretty`        | `boolean`       | `false` | Apply pretty style and opacity transition.                                          |
| `isHiddenOnError` | `boolean`       | `false` | Hide the image on error if no `srcOnError` is provided.                             |
| `styleImg`        | `CSSProperties` |         | Apply style on the `img`.                                                           |
| `styleWrapper`    | `CSSProperties` |         | Apply style on the `div` that wraps the `img`, exists only when `isPretty` is true. |
