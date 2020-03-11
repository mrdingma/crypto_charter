import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Col } from "react-bootstrap";

const Stats = ({ currentView, liveData, historicalData }) => {
  const [caption, setCaption] = useState("");

  const captionMapper = {
    live: "PAST HOUR",
    day: "TODAY",
    week: "PAST WEEK",
    month: "PAST MONTH",
    "3month": "PAST 3 MONTHS",
    year: "PAST YEAR",
    "5year": "PAST 5 YEARS"
  };

  useEffect(() => {
    setCaption(captionMapper[currentView]);
  }, [currentView]);

  const statsCalc = () => {
    let firstPrice;
    let lastPrice;

    if (currentView === "live" || currentView === "day") {
      firstPrice = Number(liveData[0].USD.replace(",", ""));
      lastPrice = Number(liveData[liveData.length - 1].USD.replace(",", ""));
    } else {
      const dataValuesArr = Object.values(historicalData);
      firstPrice = dataValuesArr[0];
      lastPrice = dataValuesArr[dataValuesArr.length - 1];
    }

    return {
      price_diff: (lastPrice - firstPrice).toFixed(2),
      percent_diff: (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)
    };
  };

  let content;

  if (
    currentView !== "live" &&
    currentView !== "day" &&
    Object.keys(historicalData).length === 0
  ) {
    content = <Spinner animation="border" variant="success" />;
  } else {
    content = (
      <>
        <Col>
          <div className="stats">
            {`$ ${statsCalc().price_diff} ( ${statsCalc().percent_diff} % )  `}
            <span className="caption">{caption}</span>
          </div>
        </Col>
      </>
    );
  }

  return content;
};

export default Stats;
