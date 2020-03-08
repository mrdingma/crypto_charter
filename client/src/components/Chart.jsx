import React, { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import LineGraph from "./LineGraph.jsx";
import ViewButtons from "./ViewButtons.jsx";
import Price from "./Price.jsx";
import _ from "lodash";

const Chart = props => {
  const [liveData, setLiveData] = useState({});
  const [livePrice, setLivePrice] = useState(null);

  // const [hoveredPrice, setHoveredPrice] = useState(null);

  // https://api.coindesk.com/v1/bpi/currentprice/CNY.json
  // ?start=2013-09-01&end=2013-09-05
  const priceToArrayConvert = (str, currency) => {
    const dotIndex = str.indexOf(".");
    return [currency, ...str.slice(0, dotIndex + 3).split("")];
  };

  const getData = (start, end) => {
    // const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;
    const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
    axios
      .get(url)
      .then(({ data }) => {
        const price = data.bpi.USD.rate;
        setLivePrice(priceToArrayConvert(price, "$"));
        setLiveData(_.assignIn(liveData, { [data.time.updated]: data.bpi }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 2000);
    return () => clearTimeout(timer);
  }, [livePrice]);

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
            <Price price={livePrice} />
          </Row>
          <Row style={{ marginTop: "10%" }}>
            <LineGraph
              setLivePrice={setLivePrice}
              priceToArrayConvert={priceToArrayConvert}
              liveData={liveData}
            />
          </Row>
          <Row style={{ margin: "2% 13% 0 7%" }}>
            <ViewButtons />
          </Row>
        </Container>
      </>
    );
  }

  return content;
};

export default Chart;
