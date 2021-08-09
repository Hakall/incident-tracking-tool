import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IncidentType } from "@itt/common";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

console.log(IncidentType.CUSTOMER);
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
