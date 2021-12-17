import React from "react";
import { Col, Row } from "react-bootstrap";
import mainContentClass from "../assets/style/mainContent.module.css";
const MainContent = (props) => {
  return (
    <div className=" justify-content-center  p-0  d-flex">
      <Row
        className={`${mainContentClass.bgrond}  ${mainContentClass.wid} p-0`}
      >
        <Col className="p-0 text-start" md={6}>
          <div>
            <img
              src={
                props.allInfo.poster === null
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g"
                  : "https://image.tmdb.org/t/p/w500" + props.allInfo.poster
              }
              className={mainContentClass.poster}
              alt={`img about this ${props.allInfo.title}`}
            />
          </div>
        </Col>
        <Col className="text-start  text-light" md={6}>
          <h4 className="pt-3 fw-bold">{props.allInfo.title.toUpperCase()}</h4>
          <p style={{ fontSize: "1em" }}>{props.allInfo.overview}</p>
          <Row>
            <Col xl={6} md={6} style={{ fontSize: "1em" }}>
              Original Release: <br />
              <span className={mainContentClass.greenN}>
                {props.allInfo.releaseDate}
              </span>
            </Col>
            <Col xl={6} md={6} style={{ fontSize: "1em" }}>
              Vote Average: <br />
              <span className={mainContentClass.greenN}>
                {props.allInfo.voteAverage} / 10
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MainContent;
