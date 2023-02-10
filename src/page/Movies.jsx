import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMoviesBySearch } from '../services/Api';

import Loader from '../components/Loader/Loader';
import MovieList from '../components/MovieList/MovieList';
import SearchBox from '../components/SearchBox/SearchBox';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams('');
  const movieName = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!movieName) return;

    const getMovies = async () => {
      setLoading(true);

      try {
        const results = await fetchMoviesBySearch(movieName);

        if (results.length === 0) {
          alert('Nothing found 🙄');
        }

        setMovies(results);
        setLoading(true);
      } catch (error) {
        setError({ error });
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [movieName]);

  const handleFormSubmit = query => {
    setSearchParams({ query });
  };

  return (
    <main>
      <SearchBox onSubmit={handleFormSubmit} />

      {movies && <MovieList movies={movies} />}

      {isLoading && <Loader />}

      {error && (
        <h2>The service is temporarily unavailable. Please try again later.</h2>
      )}
    </main>
  );
}
