import { useState, useEffect } from "react";
import * as movieShelfAPI from "../../services/movieShelf-api";

import { useLocation, useHistory } from "react-router-dom";
import s from "./MoviesPage.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoviesPageForm from "../../components/MoviesPageForm";
import MovieItem from "../../components/MovieItem";
import Loader from "../../components/Loader";

const Status = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "2eb7a20acff5570525e912c624670c08";

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const searchMovie = new URLSearchParams(location.search).get("query") ?? "";
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.RESOLVED);

  useEffect(() => {
    if (!searchMovie) {
      return;
    }

    setStatus(Status.PENDING);

    setTimeout(() => {
      fetch(
        `${BASE_URL}/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchMovie}`
      )
        .then((res) => res.json())
        .then((movies) => {
          if (movies.results.length === 0) {
            toast.error(` No movie with name ${searchMovie} `);
            return Promise.reject(
              new Error(`Please try to enter something else`)
            );
          }
          setMovies(movies.results);
          setStatus(Status.RESOLVED);
        })
        .catch((error) => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }, 1000);
  }, [searchMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // setMovies(movies);
    setStatus(Status.RESOLVED);

    if (inputValue.trim() === "") {
      toast.warning("Please enter your search query !");
      return;
    }

    movieShelfAPI
      .fetchMoviesPage(inputValue)
      .then((movies) => setMovies(movies.results));

    setInputValue("");
    history.push({
      ...location,
      search: `query=${inputValue}`,
    });
  };

  const handleQueryChange = (e) => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  if (status === Status.PENDING) {
    return (
      <div>
        <MoviesPageForm
          handleSubmit={handleSubmit}
          handleQueryChange={handleQueryChange}
          inputValue={inputValue}
        />

        <Loader />
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return (
      <div className={s.section_form}>
        <MoviesPageForm
          handleSubmit={handleSubmit}
          handleQueryChange={handleQueryChange}
          inputValue={inputValue}
        />
        <h2 className={s.error}>{error.message}</h2>
      </div>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <div className={s.section_form}>
        <MoviesPageForm
          handleSubmit={handleSubmit}
          handleQueryChange={handleQueryChange}
          inputValue={inputValue}
        />

        <MovieItem movies={movies} />
      </div>
    );
  }
}
