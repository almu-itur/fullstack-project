import { useApolloClient, useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __DATA__: { [key: string]: any };
  }
}

const Home = () => {
  const client = useApolloClient();
  console.log("client ===", client);
  const query = gql`
    query getLaunchesNext {
      launchNext {
        id
        launch_site {
          site_id
          site_name
        }
        mission_name
      }
    }
  `;
  const { data } = useQuery(query);
  console.log("data", data);

  const [test, setTest] = useState(false);
  // const [win, setWin] = useState("");

  // useEffect(() => {
  //   setWin(window.__DATA__);
  // }, []);

  return (
    // <button type="button" onClick={() => setTest(!test)}>
    <div>
      {`TEST: ${test}`}
      {/* {win} */}
      {JSON.stringify(data)}
    </div>
    // </button>
  );
};

export default Home;
