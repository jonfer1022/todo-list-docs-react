import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://o80w23xsqj.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache(),
});