import { useParams, useLocation, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { fetchMovieById } from '../services/Api';

import Loader from '../components/Loader/Loader';
import BackLink from '../components/BackLink/BackLink';
import Movie from 'components/Movie/Movie';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  const navigate = useLocation();
  const backLinkHref = navigate.state?.from ?? '/';

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      setLoading(true);

      try {
        const result = await fetchMovieById(movieId, signal);

        setMovie(result);
      } catch (error) {
        if (error.name === 'CanceledError') return;

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <main>
      <BackLink to={backLinkHref}>Back to movies</BackLink>

      {movie && <Movie movie={movie} />}

      {isLoading && <Loader />}

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
      <Suspense fallback={<div>serergter</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
