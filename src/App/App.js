import { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import "./app.module.css";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
const App = () => {
  const [allInfo, setAllInfo] = useState({
    poster: "",
    overview: "",
    title: "",
    releaseDate: "",
    voteAverage: "",
  });

  const infoAboutMovie = (allInfo) => setAllInfo(allInfo) ;
  
  return (
    <Container className="text-center p-3">
      <BrowserRouter basename="/app">
        <Route
          path="/"
          render={() => <Header infoAboutMovie={infoAboutMovie} />}
        />
        <Route path="/" render={() => <MainContent allInfo={allInfo} />} />
      </BrowserRouter>
    </Container>
  );
};

export default App;
