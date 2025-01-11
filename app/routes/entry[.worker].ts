import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  // Set the correct Content-Type header for JavaScript files
  return new Response(
    `
    self.addEventListener('install', (event) => {
      self.skipWaiting();
    });

    self.addEventListener('activate', (event) => {
      event.waitUntil(clients.claim());
    });
  `,
    {
      headers: {
        "Content-Type": "application/javascript",
      },
    }
  );
};