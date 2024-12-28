# Analytics Plugin

The Analytics plugin integrates Posthog to provide analytics functionalities

## Client

### Provider

Wrap your application inside the `AnalyticsProvider` to allow your pages to be monitored:

```tsx
<AnalyticsProvider>{children}</AnalyticsProvider>
```
