import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Home from "../shared/containers/Home";
import routes from "../shared/route";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache().restore(window.__DATA__),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Link to="/home">Home</Link>
        <Link to="/">App</Link>
        {renderRoutes(routes)}
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.hydrate(<App />, document.getElementById("root"));
