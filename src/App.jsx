import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import HomePage from "./Pages/HomePage/Homepage";
import { PlayerProvider } from "./Context/PlayerContext";

const App = () => {
  const client = new ApolloClient({
    uri: "https://api.ss.dev/resource/api",
    cache: new InMemoryCache(),
  });
  return (
    <PlayerProvider>
      <ApolloProvider client={client}>
        <HomePage />
      </ApolloProvider>
    </PlayerProvider>
  );
};

export default App;
