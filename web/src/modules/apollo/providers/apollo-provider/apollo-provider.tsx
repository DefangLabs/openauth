import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as AP,
} from "@apollo/client";

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return <AP client={client}>{children}</AP>;
}
