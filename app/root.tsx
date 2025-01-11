import type { LinkDescriptor, LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { useEffect } from 'react'
import { WorkspaceProvider } from './core/.iris/workspace'
import { UserProvider } from './core/context'
import { TrpcClient } from './core/trpc'
import { DesignSystemProvider } from './designSystem'
import { AnalyticsProvider } from './plugins/analytics/client'

export const meta: MetaFunction = () => {
  return [
    { title: 'Iris' },
    {
      name: 'description',
      content: 'Iris',
    },
  ]
}

export const links: LinksFunction = () => {
  const items: LinkDescriptor[] = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css',
    },
  ]

  return items
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        <DesignSystemProvider>
          <TrpcClient.Provider>
            <AnalyticsProvider>
              <WorkspaceProvider>
                <UserProvider>

                  {children}

                </UserProvider>
              </WorkspaceProvider>
            </AnalyticsProvider>
          </TrpcClient.Provider>
        </DesignSystemProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/entry.worker')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);
  return <Outlet />
}
