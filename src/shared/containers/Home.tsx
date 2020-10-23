import React, { useState } from "react";

const Home = () => {
  const [test, setTest] = useState(false);

  return (
    <button type="button" onClick={() => setTest(!test)}>
      {`TEST: ${test}`}
    </button>
  );
};

export default Home;
