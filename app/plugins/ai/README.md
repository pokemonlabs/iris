# AI Plugin

The AI plugin integrates with OpenAI to provide various AI-driven functionalities such as

- text generation
- JSON generation
- image generation
- audio transcription
- text-to-audio conversion.

This plugin exposes a set of tRPC routes that allow you to interact with these functionalities from the frontend and a service for the server side.

## Environment variables

```.env
SERVER_OPENAI_API_KEY=
```

## Client

Use the `Api` object for client-side functionalities.

### Generate text from prompt

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

const handleGenerateText = async () => {
  const { answer } = await generateText({
    prompt: `Create a caption for the picture attached.`,
    attachmentUrls: ['https://your-picture.jpg'], // optional picture url attachments
  })

  console.log(answer)
}
```

### Generate image from prompt

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

const handleGenerateText = async () => {
  const { url } = await generateText({
    prompt: `Create a logo for a company named "Car Tuning"`,
  })

  console.log(url)
}
```

### Generate a JSON from a prompt

The JSON structure is defined on the server in a Zod object. Feel free to change it to match your needs.

```tsx
// app/plugins/ai/server/ai.router.tsx
const schema = z.object({
  results: z.array(
    z.object({
      description: z.string(),
    }),
  ),
})
```

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: generateJson } = Api.ai.generateJson.useMutation()

const handleGenerateJSON = async () => {
  const structuredOutput = await generateImage({
    content: `There is a person named "John" and another one named "Myrtille"`,
    instruction: `Extract the description of each person.`,
    attachmentUrls: [...], // optional attachments
  })

  console.log(structuredOutput) // Typed object that matches the schema: { description: string }[]
}
```

### Audio to text

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: audioToText } = Api.ai.audioToText.useMutation()

const handleGenerateTextFromAudio = async () => {
  const { translation } = await audioToText({
    url: `https://your-audio.mp3`,
  })

  console.log(translation)
}
```

### Text to Audio

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: textToAudio } = Api.ai.textToAudio.useMutation()

const handleGenerateAudioFromText = async () => {
  const { url } = await textToAudio({
    text: `Hi, welcome to John tuning podcast.`,
  })

  console.log(url)
}
```

## Server

Use the `AiServer.service` for server-side functionalities.

```tsx
import { AiServer } from '@/plugins/ai'

AiServer.service.generateText(...)
AiServer.service.generateJson(...)
AiServer.service.generateImage(...)
AiServer.service.fromAudioToText(...)
AiServer.service.fromTextToAudio(...)
AiServer.service.isActive()
```
