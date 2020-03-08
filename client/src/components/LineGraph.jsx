import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import date from "date-and-time";
import _ from "lodash";

const LineGraph = ({ setLivePrice, priceToArrayConvert, liveData }) => {
  const timeConverter = d => {
    // return date.format(new Date(d), "MMM D, YYYY");
    return date.format(new Date(d), "h:mm:ss A");
  };

  const insertComma = str => {
    const periodIndex = str.indexOf(".");

    if (periodIndex >= 4) {
      return `${str.slice(0, periodIndex - 3)},${str.slice(periodIndex - 3)}`;
    }
    return str;
  };

  let content = <></>;

  const config = {
    labels: Object.keys(liveData).map(str => new Date(str)),
    datasets: [
      {
        label: "EOD Prices",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(236,236,238)",
        borderColor: "rgb(236,236,238)",
        borderWidth: 2,
        data: Object.values(liveData).map(currency =>
          currency.USD.rate.replace(/,/gi, "")
        )
      }
    ]
  };

  content = (
    <>
      <Container>
        <Row>
          <Col>
            <div className="chart-container">
              <Line
                data={config}
                options={{
                  title: {
                    display: false,
                    text: "BTC ($)",
                    fontSize: 20
                  },
                  elements: {
                    point: {
                      radius: 1
                    }
                  },
                  responsive: true,
                  hover: {
                    mode: "nearest",
                    intersect: true
                  },
                  tooltips: {
                    mode: "index",
                    intersect: false,
                    axis: "x",
                    callbacks: {
                      title: function(tooltipItems, data) {
                        return timeConverter(tooltipItems[0].xLabel);
                        // return insertComma(tooltipItems[0].yLabel);
                      },
                      label: function(tooltipItems, data) {
                        return "";
                      }
                    }
                  },
                  scales: {
                    xAxes: [
                      {
                        type: "time",
                        gridLines: {
                          display: false
                        },
                        ticks: {
                          display: false
                        }
                      }
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          display: false
                        },
                        ticks: {
                          display: true
                        }
                      }
                    ]
                  },
                  maintainAspectRatio: true,
                  legend: {
                    display: false,
                    position: "right"
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );

  return content;
};

export default LineGraph;
