import { useState, useEffect } from "react";
import * as movieShelfAPI from "../../services/movieShelf-api";
import s from "./Reviews.module.css";

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    movieShelfAPI
      .fetchMovieReviews(movieId)
      .then((response) => setReviews(response.results))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [movieId]);

  return (
    <div>
      <ul className={s.reviews_list}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id} className={s.reviews_item}>
              <p className={s.author}>Author : {review.author}</p>
              <p className={s.reviews_text}>{review.content}</p>
            </li>
          ))
        ) : (
          <p className={s.reviews_no}>
            We don`t have any reviews for this movie.
          </p>
        )}
      </ul>
    </div>
  );
}
