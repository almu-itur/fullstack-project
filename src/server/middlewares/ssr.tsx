import React from "react";
import ReactDOMServer from "react-dom/server";
import fetch from "cross-fetch";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import { RequestHandler } from "express";
import Home from "../../shared/containers/Home";
import App from "../../shared/containers/App";
import routes from "../../shared/route";

const html = (content, data) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TEST</title>
  </head>
  <body>
    <div id="root">
      ${content}
    </div>
    <script>window.__DATA__=${JSON.stringify(data).replace(
      /</g,
      "\\u003c"
    )}</script>
    <script src="main.js"></script>
  </body>
</html>
`;

const _data = {
  covid: "We are screwed",
};
const httpLink = createHttpLink({
  uri: "https://api.spacex.land/graphql/",
  fetch,
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: true,
});

const ssr: RequestHandler = (req, res, next) => {
  const appTree = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.path} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </ApolloProvider>
  );
  renderToStringWithData(appTree).then((content) => {
    const initialState = client.extract();

    res.status(200);
    res.send(html(content, initialState));
    res.end();
  });

  // const elementAsString = ReactDOMServer.renderToString(<Home />);
  // const elementAsString = ReactDOMServer.renderToString(appTree);
  // res.send(html(elementAsString, _data));
};

export default ssr;
