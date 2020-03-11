import React, { useState, useEffect } from "react";
import { Container, Row, div } from "react-bootstrap";

const ViewButtons = ({ currentView, setCurrentView }) => {
  const [isLiveHover, setIsLiveHover] = useState(false);
  const [isDayHover, setIsDayHover] = useState(false);
  const [isWeekHover, setIsWeekHover] = useState(false);
  const [isMonthHover, setIsMonthHover] = useState(false);
  const [is3MonthHover, setIs3MonthHover] = useState(false);
  const [isYearHover, setIsYearHover] = useState(false);
  const [is5YearHover, setIs5YearHover] = useState(false);

  let content = (
    <>
      <div
        className="viewBtn"
        onMouseEnter={() => setIsLiveHover(true)}
        onMouseLeave={() => setIsLiveHover(false)}
        style={{
          color: isLiveHover || currentView === "live" ? "#25AC81" : "white",
          borderBottom: currentView === "live" ? "1px solid #25AC81" : null
        }}
        onClick={() => (currentView !== "live" ? setCurrentView("live") : null)}
      >
        <span>LIVE</span>
      </div>
      <div
        className="viewBtn"
        onMouseEnter={() => setIsDayHover(true)}
        onMouseLeave={() => setIsDayHover(false)}
        style={{
          color: isDayHover || currentView === "day" ? "#25AC81" : "white",
          borderBottom: currentView === "day" ? "1px solid #25AC81" : null
        }}
        onClick={() => (currentView !== "day" ? setCurrentView("day") : null)}
      >
        1 D
      </div>
      <div
        className="viewBtn"
        onMouseEnter={() => setIsWeekHover(true)}
        onMouseLeave={() => setIsWeekHover(false)}
        style={{
          color: isWeekHover || currentView === "week" ? "#25AC81" : "white",
          borderBottom: currentView === "week" ? "1px solid #25AC81" : null
        }}
        onClick={() => (currentView !== "week" ? setCurrentView("week") : null)}
      >
        1 W
      </div>
      <div
        className="viewBtn"
        onMouseEnter={() => setIsMonthHover(true)}
        onMouseLeave={() => setIsMonthHover(false)}
        style={{
          color: isMonthHover || currentView === "month" ? "#25AC81" : "white",
          borderBottom: currentView === "month" ? "1px solid #25AC81" : null
        }}
        onClick={() =>
          currentView !== "month" ? setCurrentView("month") : null
        }
      >
        1 M
      </div>
      <div
        className="viewBtn"
        onMouseEnter={() => setIs3MonthHover(true)}
        onMouseLeave={() => setIs3MonthHover(false)}
        style={{
          color:
            is3MonthHover || currentView === "3month" ? "#25AC81" : "white",
          borderBottom: currentView === "3month" ? "1px solid #25AC81" : null
        }}
        onClick={() =>
          currentView !== "3month" ? setCurrentView("3month") : null
        }
      >
        3 M
      </div>
      <div
        className="viewBtn"
        onMouseEnter={() => setIsYearHover(true)}
        onMouseLeave={() => setIsYearHover(false)}
        style={{
          color: isYearHover || currentView === "year" ? "#25AC81" : "white",
          borderBottom: currentView === "year" ? "1px solid #25AC81" : null
        }}
        onClick={() => (currentView !== "year" ? setCurrentView("year") : null)}
      >
        1 Y
      </div>
      <div
        className="viewBtn"
        onMouseEnter={() => setIs5YearHover(true)}
        onMouseLeave={() => setIs5YearHover(false)}
        style={{
          color: is5YearHover || currentView === "5year" ? "#25AC81" : "white",
          borderBottom: currentView === "5year" ? "1px solid #25AC81" : null
        }}
        onClick={() =>
          currentView !== "5year" ? setCurrentView("5year") : null
        }
      >
        5 Y
      </div>
    </>
  );

  return content;
};

export default ViewButtons;
