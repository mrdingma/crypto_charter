import React, { useState, useEffect } from "react";
import Chart from "./Chart.jsx";

import LineGraph from "./LineGraph.jsx";

const App = props => {
  const [currency, setCurrency] = useState("bitcoin");

  let content = (
    <>
      <Chart currency={currency} />
    </>
  );

  return content;
};

export default App;
