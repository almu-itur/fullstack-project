import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Home from "../shared/containers/Home";
import routes from "../shared/route";

const App = () => {
  return (
    <BrowserRouter>
      <Link to="/home">Home</Link>
      <Link to="/">App</Link>
      {renderRoutes(routes)}
    </BrowserRouter>
  );
};

ReactDOM.hydrate(<App />, document.getElementById("root"));
