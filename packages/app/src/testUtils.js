import React from "react";
import { setupServer } from "msw/node";
import { render } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export { graphql } from "msw";

export { default as userEvent } from "@testing-library/user-event";

export * from "@testing-library/react";

export const Location = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const Providers = ({ children }) => {
  return (
    <MemoryRouter>
      <Location />
      {children}
    </MemoryRouter>
  );
};

const wrappedRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export { wrappedRender as render };

export const createGraphQLProvider = (...providers) => {
  const server = setupServer(...providers);

  beforeAll(() => server.listen());

  afterAll(() => server.close());

  const ApolloTestWrapper = ({ children }) => {
    const defaultOptions = {
      query: {
        fetchPolicy: "no-cache",
      },
    };

    const client = new ApolloClient({
      uri: "http://localhost:8080",
      cache: new InMemoryCache(),
      defaultOptions,
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  };

  return ApolloTestWrapper;
};
