import React from "react";
import { Line } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import date from "date-and-time";
import commaNumber from "comma-number";

const LineGraph = ({ liveData, currentView, historicalData }) => {
  const timeConverter = d => {
    return date.format(new Date(d), "h:mm A");
  };

  const timeConverterDay = d => {
    return date.format(new Date(d), "MMM D, YYYY");
  };

  let content = <></>;

  let config;
  if (currentView === "live" || currentView === "day") {
    config = {
      labels: liveData.map(({ time }) => new Date(time)),
      datasets: [
        {
          label: "EOD Prices",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgb(236,236,238)",
          borderColor: "rgb(236,236,238)",
          borderWidth: 2,
          data: Object.values(liveData).map(({ USD }) => USD.replace(/,/gi, ""))
        }
      ]
    };
  } else {
    config = {
      labels: Object.keys(historicalData),
      datasets: [
        {
          label: "EOD Prices",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgb(236,236,238)",
          borderColor: "rgb(236,236,238)",
          borderWidth: 2,
          data: Object.values(historicalData)
        }
      ]
    };
  }

  content = (
    <>
      <Container>
        <Row>
          <Col>
            <div className="chart-container">
              <Line
                data={config}
                options={{
                  elements: {
                    point: {
                      display: false,
                      radius: 0
                    }
                  },
                  responsive: true,
                  hover: {
                    mode: "nearest",
                    intersect: true
                  },
                  tooltips: {
                    custom: function(tooltip) {
                      if (!tooltip) return;
                      tooltip.displayColors = false;
                    },
                    mode: "index",
                    intersect: false,
                    axis: "x",
                    callbacks: {
                      title: function(tooltipItems, data) {
                        const twoSigDigits = Number(
                          tooltipItems[0].value
                        ).toFixed(2);
                        if (currentView === "live" || currentView === "day") {
                          return `${timeConverter(
                            tooltipItems[0].xLabel
                          )}\n$${commaNumber(twoSigDigits)}`;
                        }
                        return `${timeConverterDay(
                          tooltipItems[0].xLabel
                        )}\n$${commaNumber(twoSigDigits)}`;
                      },
                      label: function(tooltipItems, data) {
                        return;
                        // const twoSigDig = Number(tooltipItems.value).toFixed(2);
                        // return `$${commaNumber(twoSigDigits)}`;
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
