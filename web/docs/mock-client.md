# Mock Fabric Client

This document explains how the in-memory Fabric client works and how to select different scenarios when running the portal locally.

## Choosing a Scenario

The mock client supports a small set of **scenarios**. A scenario dictates what data the API returns. The scenario can be chosen in two ways:

1. **Query parameter** – append `?mockScenario=default` (or `empty`) to the application URL. The choice is stored in `localStorage` and persists across reloads.
2. **Environment variable** – set `NEXT_PUBLIC_DEFANG_MOCK_SCENARIO` when starting the app. This is useful for automated tests.

If no scenario is provided, the client defaults to `default` which returns an example service and a list of mock deployments.

## Purpose

The mock client allows the UI to function without a running backend and is ideal for storybook or component testing. Each Fabric RPC method is implemented with predictable dummy responses so the surrounding UI can be developed in isolation.
