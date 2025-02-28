import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import {
  ApolloProvider as AP,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo, useRef } from "react";

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAccessToken();
  const tokenRef = useRef(token);
  tokenRef.current = token;

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    });

    const authLink = setContext(() => {
      return {
        headers: {
          Authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return <AP client={client}>{children}</AP>;
}
