import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as d3 from "d3";

const Price = ({ price }) => {
  // const [isDashboardView, setIsDashboardView] = useState();
  const d3Container = useRef();

  useEffect(() => {
    const t = d3.transition().duration(750);

    if (price) {
      const u = d3
        .select(d3Container.current)
        .selectAll("div")
        .data(price, (d, i) => `${i}${d}`)
        .join(
          enter =>
            enter
              .append("div")
              .style("position", "absolute")
              .attr("class", "enter")
              .text(d => d)
              .style("fontSize", 30)
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
          // .style("opacity", 0)
          // .style("transform", (d, i) => `translate(${i * 18}px,-30px)`)
          // .call(update =>
          //   update
          //     .transition(t)
          //     .style("opacity", 1)
          //     .style("transform", (d, i) => `translate(${i * 18}px,0px)`)
          // ),
          // update => update.attr("class", "update").text(d => d),
          // .style("transform", (d, i) => `translate(${i * 18}px,-30px)`),
          // .call(update =>
          //   update
          //     .transition(t)
          //     .style("transform", (d, i) => `translate(${i * 18}px,30px)`)
          //     .style("opacity", 1)
          //     .remove()
          // ),
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

      // u.exit()
      //   .transition(t)
      //   .style("transform", (d, i) => `translate(${i * 18}px,-30px)`)
      //   .style("opacity", 0)
      //   .remove();

      // u.enter()
      //   .append("div")
      //   .style("position", "absolute")
      //   .style("display", "inline-block")
      //   .style("transform", (d, i) => `translate(${i * 18}px,-30px)`)
      //   .style("opacity", 0)
      //   .style("font-size", "30px")
      //   .style("line-height", 1)
      //   .text(d => d)
      //   .transition(t)
      //   .style("transform", (d, i) => `translate(${i * 18}px,0px)`)
      //   .style("opacity", 1);

      // u.update().text(d => d);

      //   update => update,
      //   exit =>
      //     exit.call(exit =>
      //       exit
      //         .transition()
      //         .duration(1000)
      //         // .style("transform", (d, i) => `translate(${i * 18}px,-30px)`)
      //         .style("opacity", 0)
      //         .remove()
      //     )
      // );
    }
  }, [price]);

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
