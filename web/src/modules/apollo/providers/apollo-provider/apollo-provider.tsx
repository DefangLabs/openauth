/**
 * Global Apollo Client provider used by the Next.js app.
 *
 * Each GraphQL request includes the user's JWT and the selected tenant ID via
 * custom headers. The tenant header is currently named `X-Defang-Tenant-Id` until
 * the backend finalizes the API contract.
 */
import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { useCurrentTenant } from "@/modules/tenants/hooks/use-current-tenant";
import {
  ApolloProvider as AP,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  fromPromise,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useMemo, useRef } from "react";

const TOKEN_CLEANUP_TIMEOUT_MS = 60 * 1000;

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const { token, refresh } = useAccessToken();
  const { currentTenant } = useCurrentTenant();
  const tokenRef = useRef(token);
  const tenantRef = useRef(currentTenant);
  const refreshRef = useRef(refresh);
  // Map to track which operations have been retried
  const retriedOperations = useRef(new Map<string, boolean>());
  tokenRef.current = token;
  tenantRef.current = currentTenant;
  refreshRef.current = refresh;

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    });

    const authLink = setContext(() => {
      return {
        headers: {
          Authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : "",
          ...(tenantRef.current && {
            ["X-Defang-Tenant-Id"]: tenantRef.current,
          }),
        },
      };
    });

    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
      // Check if we have the specific invalid-headers error
      const invalidHeadersError = graphQLErrors?.find(
        (error) =>
          error.extensions?.code === "invalid-headers" &&
          error.message === "Malformed Authorization header",
      );

      // Get operation ID for tracking retries
      const operationName = operation.operationName || "anonymous";
      const operationId = `${operationName}-${Date.now()}`;

      // If we found the error and haven't retried this operation yet, refresh the token and retry
      if (invalidHeadersError && !retriedOperations.current.get(operationId)) {
        // Mark this operation as retried
        retriedOperations.current.set(operationId, true);

        // Clean up the retried operations map to prevent memory leaks
        // Set a timeout to remove the tracking after a reasonable time
        setTimeout(() => {
          retriedOperations.current.delete(operationId);
        }, TOKEN_CLEANUP_TIMEOUT_MS); // Clean up after TOKEN_CLEANUP_TIMEOUT_MS

        // Return a new observable that will refresh the token and retry
        return new Observable((observer) => {
          // Refresh the token
          refreshRef
            .current()
            .then((result) => {
              // Update the auth header with the new token
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  Authorization: result?.token ? `Bearer ${result.token}` : "",
                  ...(tenantRef.current && {
                    ["X-Defang-Tenant-Id"]: tenantRef.current,
                  }),
                },
              });
              // Retry the operation
              forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch((error) => observer.error(error));
        });
      }
      // For other errors or if we've already retried, pass them through
      return undefined;
    });

    return new ApolloClient({
      link: errorLink.concat(authLink.concat(httpLink)),
      cache: new InMemoryCache(),
    });
  }, []);

  return <AP client={client}>{children}</AP>;
}
