import { useParams, useLocation, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { fetchMovieById } from '../services/Api';
import { Status } from '../constants/status';
import ErorrMessega from '../components/ErorrMessega/ErorrMessega';
import Loader from '../components/Loader/Loader';
import BackLink from '../components/BackLink/BackLink';
import Movie from 'components/Movie/Movie';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const { movieId } = useParams();

  const navigate = useLocation();
  const backLinkHref = navigate.state?.from ?? '/';

  useEffect(() => {
    setStatus(Status.PENDING);

    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      try {
        const result = await fetchMovieById(movieId, signal);

        setMovie(result);
        setStatus(Status.RESOLVED);
      } catch (error) {
        if (error.name === 'CanceledError') return;

        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
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

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErorrMessega message={error} />}

      {status === Status.RESOLVED && <Movie movie={movie} />}

      <Suspense fallback={<div>serergter</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
