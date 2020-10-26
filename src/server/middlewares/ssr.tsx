import React from "react";
import ReactDOMServer from "react-dom/server";
import { RequestHandler } from "express";
import Home from "../../shared/containers/Home";

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
  const elementAsString = ReactDOMServer.renderToString(<Home />);
  res.send(html(elementAsString, _data));
};

export default ssr;
