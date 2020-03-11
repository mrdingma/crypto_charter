import React, { useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import * as d3 from "d3";

const Price = ({ livePrice }) => {
  const d3Container = useRef();

  useEffect(() => {
    const t = d3.transition().duration(1000);

    if (livePrice) {
      const u = d3
        .select(d3Container.current)
        .selectAll("div")
        .data(livePrice, (d, i) => `${i}${d}`)
        .join(
          enter =>
            enter
              .append("div")
              .style("position", "absolute")
              .attr("class", "enter")
              .text(d => d)
              .style("fontSize", "1.5rem !important")
              .style("opacity", 0)
              .style("transform", (d, i) => {
                return `translate(${i * 18}px,30px)`;
              })
              .call(enter =>
                enter
                  .transition(t)
                  .style("opacity", 1)
                  .style("transform", (d, i) => `translate(${i * 18}px,0px)`)
              ),
          update => update.attr("class", "update").text(d => d),
          exit =>
            exit.attr("class", "exit").call(exit =>
              exit
                .transition(t)
                .style("transform", (d, i) => {
                  return `translate(${i * 18}px,30px)`;
                })
                .style("opacity", 0)
                .remove()
            )
        );
    }
  }, [livePrice]);

  let content = (
    <>
      <Col>
        <div ref={d3Container} style={{ position: "relative" }}></div>
      </Col>
    </>
  );

  return content;
};

export default Price;
