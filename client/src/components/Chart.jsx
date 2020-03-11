import React, { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import LineGraph from "./LineGraph.jsx";
import ViewButtons from "./ViewButtons.jsx";
import Price from "./Price.jsx";
import Stats from "./Stats.jsx";
import date from "date-and-time";
import commaNumber from "comma-number";

const Chart = props => {
  const [liveData, setLiveData] = useState({});
  const [livePrice, setLivePrice] = useState(null);
  const [historicalData, setHistoricalData] = useState({});
  const [currentView, setCurrentView] = useState("live");

  const setPriceHandler = (str, currency) => {
    const twoSigDigits = Number(str.replace(",", "")).toFixed(2);
    const commaSeparatedStr = commaNumber(twoSigDigits);
    setLivePrice([currency, ...commaSeparatedStr.split("")]);
  };

  const timeConverter = d => {
    return date.format(new Date(d), "YYYY-MM-DD");
  };

  const getLiveData = () => {
    let url;

    if (currentView === "live") {
      url = "/btc/hour";
    }

    if (currentView === "day") {
      url = "/btc/day";
    }

    axios
      .get(url)
      .then(({ data }) => {
        const price = data[data.length - 1].USD;
        setPriceHandler(price, "$");
        setLiveData(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getHistoricalData = () => {
    let d = new Date();
    const current = timeConverter(d);
    let start;

    if (currentView === "week") {
      d.setDate(d.getDate() - 7);
      start = timeConverter(d);
    }

    if (currentView === "month") {
      d.setMonth(d.getMonth() - 1);
      start = timeConverter(d);
    }

    if (currentView === "3month") {
      d.setMonth(d.getMonth() - 3);
      start = timeConverter(d);
    }

    if (currentView === "year") {
      d.setFullYear(d.getFullYear() - 1);
      start = timeConverter(d);
    }

    if (currentView === "5year") {
      d.setFullYear(d.getFullYear() - 5);
      start = timeConverter(d);
    }

    let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${current}`;

    if (currentView !== "live" && currentView !== "day") {
      axios
        .get(url)
        .then(({ data }) => {
          setHistoricalData(data.bpi);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getHistoricalData();
  }, [currentView]);

  useEffect(() => {
    getLiveData();
  }, [currentView]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getLiveData();
    }, 2000);
    return () => clearTimeout(timer);
  }, [livePrice, currentView]);

  let content = (
    <>
      <Container>
        <Row>
          <Col>
            <div style={{ fontSize: "40px" }}>
              {props.currency.toUpperCase()}
            </div>
          </Col>
        </Row>
        <Row>
          <Spinner animation="border" variant="success" />
        </Row>
      </Container>
    </>
  );

  if (livePrice !== null && Object.keys(liveData).length > 0) {
    content = (
      <>
        <Container>
          <Row>
            <Col>
              <div style={{ fontSize: "40px" }}>
                {props.currency.toUpperCase()}
              </div>
            </Col>
          </Row>
          <Row>
            <Price livePrice={livePrice} />
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Stats
              currentView={currentView}
              liveData={liveData}
              historicalData={historicalData}
            />
          </Row>
          <Row style={{ marginTop: "2%" }}>
            <LineGraph
              currentView={currentView}
              liveData={liveData}
              historicalData={historicalData}
            />
          </Row>
          <Row style={{ margin: "2% 13% 0 7%" }}>
            <ViewButtons
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          </Row>
        </Container>
      </>
    );
  }

  return content;
};

export default Chart;
