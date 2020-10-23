import React from "react";
import ReactDOMServer from "react-dom/server";
import { RequestHandler } from "express";
import Home from "../../shared/containers/Home";

const html = (content) => `<!DOCTYPE html>
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
    <script src="main.js"></script>
  </body>
</html>
`;

const ssr: RequestHandler = (req, res, next) => {
  const elementAsString = ReactDOMServer.renderToString(<Home />);
  console.log("res.locals", res.locals);
  res.send(html(elementAsString));
};

export default ssr;
