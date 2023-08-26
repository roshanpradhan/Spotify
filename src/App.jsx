import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = () => {
  const client = new ApolloClient({
    uri: "https://api.ss.dev/resource/api",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div>Spotify Clone</div>
    </ApolloProvider>
  );
};

export default App;
