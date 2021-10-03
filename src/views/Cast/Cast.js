import { useState, useEffect } from "react";
import * as movieShelfAPI from "../../services/movieShelf-api";
import s from "./Cast.module.css";
import defaultImg from "./default.png";

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const ImgUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    movieShelfAPI
      .fetchMovieCast(movieId)
      .then((response) => setCast(response.cast))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [movieId]);

  return (
    <div>
      <ul className={s.cast_list}>
        {cast &&
          cast.map((cast) => (
            <li key={cast.cast_id} className={s.cast_item}>
              <img
                className={s.cast_photo}
                src={
                  cast.profile_path
                    ? `${ImgUrl}${cast.profile_path}`
                    : defaultImg
                }
                alt={cast.name}
                width="180"
                height="280"
              />
              <p className={s.cast_name}>{cast.name}</p>
              <p className={s.cast_character}>Character: {cast.character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
