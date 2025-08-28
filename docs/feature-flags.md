# Feature Flags

This document outlines how client-side feature flags work in the web application.

## Available Flags

Flags are defined in [`web/src/modules/feature-flags/feature-flags.ts`](../web/src/modules/feature-flags/feature-flags.ts). Each key of `DEFAULT_FEATURE_FLAGS` represents a flag and must have an explicit default value. At the time of writing only the `TENANT_SWITCHER` flag exists, but more may be added in the future.

## Enabling Flags

Flags can be toggled using URL query parameters or `localStorage` values. Both approaches use the prefix `ff_` followed by the flag name. Values are case-sensitive.

### URL Parameters

Append `?ff_<FLAG>=true` to the page URL to enable a flag for a single navigation. For example:

```
/projects?ff_TENANT_SWITCHER=true
```

Query parameters are only read on the client and are lost if the page redirects. When navigating to `/` the app immediately redirects to `/projects`, so any flags passed to the root path are dropped. Navigate directly to the destination (e.g. `/projects`) or ensure the redirect preserves the query string.

### Local Storage

To persist a flag across page loads, create an entry in `localStorage`:

```js
localStorage.setItem('ff_TENANT_SWITCHER', 'true');
```

Removing the item disables the override. `localStorage` values take precedence over defaults but are overridden by URL parameters if present.

## Order of Precedence

1. URL parameter `ff_<FLAG>`
2. `localStorage` key `ff_<FLAG>`
3. Default value from `DEFAULT_FEATURE_FLAGS`

The helper `isFeatureEnabled(flag)` encapsulates this logic so both server and client components can check a flag consistently.
