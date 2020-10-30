import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./containers/App";
import Home from "./containers/Home";

export default [
  {
    path: "/",
    component: App,
    routes: [
      {
        path: "/home",
        exact: true,
        component: Home,
      },
    ],
  },
];
