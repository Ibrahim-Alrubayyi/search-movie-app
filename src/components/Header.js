import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import headerClass from "../assets/style/header.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
const Header = (props) => {
  const [textSearching, setTextSearching] = useState("");
  const [moviesUserSearching, setMoviesUserSearching] = useState([]);
  let hideUl = useRef();

  const styleBckdrop = (backDrop) => {
    document.body.style.backgroundImage = `url(${
      "https://image.tmdb.org/t/p/original" + backDrop
    })  `;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh";
  };

  //when click movie
  const changeTitleMovie = (title) => {
    let source = axios.CancelToken.source();
    const apiMovie = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=%${title}&api_key=ddcbc691afab123e59de4a0b64564209`,
          { cancelToken: source.token }
        )
        .then((res) => {
          //send info to app

          if (res.data.results.length !== 0) {
            props.infoAboutMovie({
              poster: res.data.results[0].poster_path,
              overview: res.data.results[0].overview,
              title: res.data.results[0].title,
              releaseDate: res.data.results[0].release_date,
              voteAverage: res.data.results[0].vote_average,
            });
            styleBckdrop(res.data.results[0].backdrop_path);
          }
        });
    };
    hideUl.current.classList.toggle(headerClass.hide);
    setTextSearching("");
    apiMovie();

    return () => {
      source.cancel();
    };
  };

  //when searching
  const searchHandler = (e) => {
    setTextSearching(e.target.value);
    if (e.target.value.length === 0) {
      hideUl.current.classList.toggle(headerClass.hide);
      setTextSearching("");
      setMoviesUserSearching([]);
    } else {
      hideUl.current.classList.remove(headerClass.hide);

      setTextSearching(e.target.value);
    }
  };

  //When click on an title in a search
  useEffect(() => {
    let source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=%${textSearching}&api_key=ddcbc691afab123e59de4a0b64564209`,
            { cancelToken: source.token }
          )
          .then((res) => {
            if (res.data.results.length === 0) {
              hideUl.current.classList.add(headerClass.hide);
              setMoviesUserSearching([]);
            } else {
              setMoviesUserSearching([...res.data.results]);
            }
          });
      } catch {
        console.error("error");
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [textSearching]);

  //the first time landing
  useEffect(() => {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=%THE GODFATHER
        &api_key=ddcbc691afab123e59de4a0b64564209`
      )
      .then((res) => {
        //send info to app
        props.infoAboutMovie({
          poster: res.data.results[0].poster_path,
          overview: res.data.results[0].overview,
          title: res.data.results[0].title,
          releaseDate: res.data.results[0].release_date,
          voteAverage: res.data.results[0].vote_average,
        });
        //style backDrop

        styleBckdrop(res.data.results[0].backdrop_path);
        hideUl.current.classList.add(headerClass.hide);
      });
  }, []);

  //Hide List when click body
  document.body.addEventListener("click", () =>
    hideUl.current.classList.contains(headerClass.hide) === false
      ? hideUl.current.classList.toggle(headerClass.hide)
      : null
  );

  return (
    <div>
      <Row>
        <Col>
          <Link to="/" className="h4 text-light fw-bold ">
            Movie Search
          </Link>
        </Col>
        <Col>
          <input
            value={textSearching}
            onChange={searchHandler}
            type="text"
            placeholder="Search..."
            className={`${headerClass.inp} w-50 inp text-black  mb-3`}
          />
          <ul className={headerClass.uls + " w-10"} ref={hideUl}>
            {moviesUserSearching.map((el, ind) => {
              if (ind < 6) {
                return (
                  <li
                    className={headerClass.lis}
                    key={el.id}
                    onClick={() => changeTitleMovie(el.title)}
                  >
                    {el.title}
                  </li>
                );
              }
            })}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
