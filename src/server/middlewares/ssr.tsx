import React from "react";
import ReactDOMServer from "react-dom/server";
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

const ssr: RequestHandler = (req, res, next) => {
  const appTree = (
    <StaticRouter location={req.path} context={{}}>
      {renderRoutes(routes)}
    </StaticRouter>
  );
  // const elementAsString = ReactDOMServer.renderToString(<Home />);
  const elementAsString = ReactDOMServer.renderToString(appTree);
  res.send(html(elementAsString, _data));
};

export default ssr;
