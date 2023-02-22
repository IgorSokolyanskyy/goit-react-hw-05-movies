import { useState, useEffect } from 'react';

import { fetchTrendsMovies } from 'services/Api';
import { Status } from 'constants/status';
import MovieList from 'components/MovieList';
import Loader from 'components/Loader';
import ErorrMessega from 'components/ErorrMessega';

export default function HomePage() {
  const [trends, setTrends] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const movies = await fetchTrendsMovies(signal);

        setTrends(movies);
        setStatus(Status.RESOLVED);
      } catch (error) {
        if (error.name === 'CanceledError') return;

        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
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

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErorrMessega message={error} />}

      {status === Status.RESOLVED && <MovieList movies={trends} />}
    </main>
  );
}
