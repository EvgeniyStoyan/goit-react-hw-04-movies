import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import * as movieShelfAPI from "../../services/movieShelf-api";
import Loader from "../../components/Loader";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast/Cast" /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /* webpackChunkName: "reviews" */)
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const ImgUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    movieShelfAPI.fetchMovieId(movieId).then((response) => setMovie(response));
  }, [movieId]);

  const getMovieYear = () => {
    if (movie) {
      return new Date(movie.release_date).getFullYear();
    }
  };
  const year = getMovieYear();

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <div>
      {movie && (
        <div className={s.information_movie}>
          <button type="button" onClick={onGoBack} className={s.button_back}>
            Go back
          </button>
          <div className={s.card_movie}>
            <img
              className={s.poster}
              src={`${ImgUrl}${movie.poster_path}`}
              alt={movie.title}
              // width="300"
              // height="440"
            />
            <div className={s.card_text}>
              <h2 className={s.movie_title}>
                {movie.title}
                <span> ({year})</span>
              </h2>

              <p className={s.score}>
                User score: {Math.round(movie.vote_average * 100) / 10}%
              </p>
              <h3 className={s.overview_title}>Overview</h3>
              <p className={s.overview_text}>{movie.overview}</p>
              <h3 className={s.genres}>Genres: </h3>
              <ul className={s.genres_list}>
                {movie.genres.map((genre) => (
                  <li key={genre.id} className={s.genres_item}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <hr className={s.delimiter} /> */}
          <div className={s.bottom_section_}>
            <p className={s.information}>Additional information</p>
            <ul className={s.information_list}>
              <li className={s.cast}>
                <NavLink
                  to={`${url}/cast`}
                  className={s.link}
                  activeClassName={s.activeLink}
                >
                  Cast
                </NavLink>
              </li>
              <li className={s.reviews}>
                <NavLink
                  to={`${url}/reviews`}
                  className={s.link}
                  activeClassName={s.activeLink}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>

            <Suspense fallback={<Loader />}>
              <Route path={`${path}/cast`}>
                {movie && <Cast movieId={movieId} />}
              </Route>
              <Route path={`${path}/reviews`}>
                {movie && <Reviews movieId={movieId} />}
              </Route>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
