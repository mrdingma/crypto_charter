import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ViewButtons = props => {
  // const [isDashboardView, setIsDashboardView] = useState();

  let content = (
    <>
      <Col style={{ marginLeft: "10%" }}>LIVE</Col>
      <Col>1 D</Col>
      <Col>1 W</Col>
      <Col>1 M</Col>
      <Col>3 M</Col>
      <Col>5 Y</Col>
    </>
  );

  return content;
};

export default ViewButtons;
