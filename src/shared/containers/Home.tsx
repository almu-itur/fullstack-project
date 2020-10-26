import React, { useEffect, useState } from "react";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __DATA__: { [key: string]: any };
  }
}

const Home = () => {
  const [test, setTest] = useState(false);
  // const [win, setWin] = useState("");

  // useEffect(() => {
  //   setWin(window.__DATA__);
  // }, []);

  return (
    <button type="button" onClick={() => setTest(!test)}>
      {`TEST: ${test}`}
      {/* {win} */}
    </button>
  );
};

export default Home;
