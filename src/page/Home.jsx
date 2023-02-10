import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList/MovieList';

import Loader from '../components/Loader/Loader';
import { fetchTrendsMovies } from '../services/Api';

export default function HomePage() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const movies = await fetchTrendsMovies(signal);

        setTrends(movies);
      } catch (error) {
        if (error.name === 'CanceledError') return;

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main>
      <h1
        style={{
          textAlign: 'center',
          marginTop: 0,
          marginBottom: 25,
          fontSize: 44,
        }}
      >
        Trending today
      </h1>

      {trends && <MovieList movies={trends} />}

      {error && (
        <h2
          style={{
            textAlign: 'center',
            color: 'red',
            marginTop: 0,
            marginBottom: 25,
            fontSize: 44,
          }}
        >
          The service is temporarily unavailable. Please try again later.
        </h2>
      )}

      {isLoading && <Loader />}
    </main>
  );
}
