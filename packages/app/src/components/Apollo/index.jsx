import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

export const Provider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

Provider.displayName = "Apollo.Provider";
