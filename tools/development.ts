import startApp from "../src/server";
import webpackConfig from "../webpack.config";

// @ts-ignore
startApp({ mode: "development", config: webpackConfig, port: 8000 });
