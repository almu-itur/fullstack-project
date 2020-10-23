import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import App from "../shared/containers/App";
import Home from "../shared/containers/Home";
import ssr from "./middlewares/ssr";
import sample from "./middlewares/sample";

type serverArgs = {
  mode: "production" | "development";
  config: Partial<webpack.Configuration>;
  port: number;
};

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

  app.use(sample);

  app.use(ssr);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

export default startApp;
