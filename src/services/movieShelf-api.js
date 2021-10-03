const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = '2eb7a20acff5570525e912c624670c08';

async function fetchWithErrorHandling(url = '') {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}`,
  );
}

export function fetchMovieId(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMoviesPage(searchQuery) {
  return fetch(
    `${BASE_URL}/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`,
  ).then(res => res.json());
}
