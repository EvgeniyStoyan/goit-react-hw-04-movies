import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './MovieItem.module.css';

const MovieItem = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={s.list_item}>
      {movies &&
        movies.map(movie => (
          <li key={movie.id} className={s.item}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
              className={s.link}
            >
              {movie.title ? movie.title : movie.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MovieItem;
