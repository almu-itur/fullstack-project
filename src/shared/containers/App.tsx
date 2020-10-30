import React from "react";
import { renderRoutes } from "react-router-config";

const App = ({ location, match, route }) => {
  console.log({ location, match, route });
  return <>{renderRoutes(route.routes)}</>;
};

export default App;
