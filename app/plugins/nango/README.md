# How to integrate third party applications in your app using Nango

You often need to integrate third party apps in your app. For example, allowing users to link their Notion, Google Drive accounts to fetch their documents, or connect to Airtable to push a new entry in a database from your app.

This module integrates [Nango.dev](https://nango.dev) - a free and open-source library that supports 250 integrations already built-in.

## Activation

1. Sign up to Nango.dev

Go to [Nango.dev](https://nango.dev) and create an account.

2. Create your first integration in Nango

3. Register your app to on the integration's developer portal

4. Add the integration's oAuth client id/keys to Nango

5. Add the Nango API keys to .env of your app

```bash
SERVER_NANGO_SECRET_KEY=
PUBLIC_NANGO_KEY=
```

## Usage

### Link a user account

You can link a user ID or an organisation ID to the application. You don't need to worry about oAuth or keeping/refreshing the token, Nango does that for you.

```tsx
import { Api } from '@/core/trpc'
import { message } from 'antd'

const nango = useNango()

const authenticate = async () => {
  nango
    .auth('notion', user?.id) // replace with the relevant integration
    .then(async result => {
      message.info('Integration linked successfully.')
    })
    .catch(error => {
      message.info('Error linking integration')
    })
}
```

### Fetch or push data from the integration

Then to fetch or push data to the integrated app, call the Nango proxy with the target endpoint, the integration and the connectionId (which is the user or organisation's associated id).

```tsx
import { Api } from '@/core/trpc'
import { message } from 'antd'

const { mutateAsync: nangoProxy } = Api.nango.proxy.useMutation()

const fetchData = async () => {
  const config = {
    method: 'GET',
    endpoint: 'https://api.notion.com/v1/search',
    providerConfigKey: 'notion',
    connectionId: user?.id,
  } // replace with relevant config

  try {
    const { data } = await nangoProxy(config)
  } catch (error) {
    message.error('failed to query notion')
  }
}
```
