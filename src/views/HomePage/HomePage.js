import { useState, useEffect } from 'react';
import * as movieShelfAPI from '../../services/movieShelf-api';
import MovieItem from '../../components/MovieItem';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieShelfAPI.fetchMovies().then(response => setMovies(response.results));
  }, [setMovies]);

  return (
    <div>
      <h2 className={s.title}>Trending today</h2>
      <MovieItem movies={movies}></MovieItem>
    </div>
  );
}
