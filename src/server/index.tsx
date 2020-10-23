import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import App from "../shared/containers/App";
import Home from "../shared/containers/Home";

type serverArgs = {
  mode: "production" | "development";
  config: Partial<webpack.Configuration>;
  port: number;
};

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

const startApp = ({ mode, config, port }: serverArgs) => {
  const app = express();

  app.use(express.static(__dirname + "../../../dist"));

  if (mode === "development") {
    const compiler = webpack(config);

    const webpackMiddleware = webpackDevMiddleware(compiler, {
      serverSideRender: true,
      publicPath: config.output.publicPath,
    });

    app.use(webpackMiddleware);

    const hotMiddleware = webpackHotMiddleware(compiler);

    app.use(hotMiddleware);
  }

  app.get("/", (req, res) => {
    const elementAsString = ReactDOMServer.renderToString(<Home />);
    // res.sendFile(path.join(__dirname + "/index.html"));
    console.log("====> ", elementAsString);

    res.send(html(elementAsString));
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

export default startApp;
