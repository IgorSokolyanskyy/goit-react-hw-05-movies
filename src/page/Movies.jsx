import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMoviesBySearch } from '../services/Api';
import { Status } from '../constants/status';
import ErorrMessega from '../components/ErorrMessega/ErorrMessega';
import Loader from '../components/Loader/Loader';
import MovieList from '../components/MovieList/MovieList';
import SearchBox from '../components/SearchBox/SearchBox';

export default function Movies() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const [searchParams, setSearchParams] = useSearchParams('');
  const movieName = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!movieName) return;
    setStatus(Status.PENDING);

    const getMovies = async () => {
      try {
        const results = await fetchMoviesBySearch(movieName);

        if (results.length === 0) {
          alert('Nothing found 🙄');
          setStatus(Status.IDLE);
          return;
        }

        setMovies(results);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
      }
    };

    getMovies();
  }, [movieName]);

  const handleFormSubmit = query => {
    setSearchParams({ query });
    setStatus(Status.IDLE);
  };

  return (
    <main>
      <SearchBox onSubmit={handleFormSubmit} />

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErorrMessega message={error} />}

      {status === Status.RESOLVED && <MovieList movies={movies} />}
    </main>
  );
}
