# Email Plugin

The Email plugin integrates with Mailjet to provide email functionalities.

Note: If Mailjet environment variables are not defined, the plugin defaults to nodemailer. Make sure you defined those in production.

## Environment variables

```.env
SERVER_EMAIL_MAILJET_API_KEY=
SERVER_EMAIL_MAILJET_SECRET_KEY=
```

## Client

Use the `Api` object for client-side functionalities.

### Send an email

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: sendEmail } = Api.email.send.useMutation()

const handle = async () => {
  await sendEmail({
    userId: '...', // The user to notify
    email: 'Sender email',
    name: 'Sender name',
    subject: 'Hello folk',
    content: 'Just wanted to say hi.',
  })
}
```

### Send an email using a template

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: sendEmail } = Api.email.send.useMutation()

const handle = async () => {
  await sendEmail({
    userId: '...', // The user to notify
    email: 'Sender email',
    name: 'Sender name',
    templateKey: 'welcome',
    subject: 'Hello folk',
    // If the template is using dynamic tokens, you can gives values here
    variables: {
      key: 'value',
    },
  })
}
```

## Server

Use the `EmailServer.service` for server-side functionalities.

```tsx
import { AiServer } from '@/plugins/ai'

AiServer.service.send(...)
```

### Add a template

1. Create your template in `app/plugins/email/server/templates`

```tsx
// app/plugins/email/server/templates/yourCustomTemplate.ts
export const YourCustomTemplate = `
<Card.Header>
  <h2>Welcome to the platform</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>Welcome {{ name }}</p>
</Card.Body>

<Card.Footer>
  <p>Sent by Your App</p>
</Card.Footer>
  `.trim()
```

2. Import the template in the email service `app/plugins/email/server/email.service.tsx`

```tsx
import { YourCustomTemplate } from './templates/yourCustomTemplate'

...
const templates = {
  resetPassword: TemplateResetPassword,
  verificationCode: TemplateVerificationCode,
  welcome: TemplateWelcome,
  invitationToOrganization: TemplateInvitationToOrganization,
  yourCustomTemplate: YourCustomTemplate // here
}
...
```

3. Use your template

```tsx
import { AiServer } from '@/plugins/ai'

AiServer.service.send({
  ...
  templateKey: 'yourCustomTemplate',
  variables: {
    name: 'Michael'
  }
})
```
