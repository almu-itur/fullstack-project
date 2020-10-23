import React from "react";
import ReactDOM from "react-dom";
import Home from "../shared/containers/Home";

const App = () => <Home />;

ReactDOM.hydrate(<App />, document.getElementById("root"));
