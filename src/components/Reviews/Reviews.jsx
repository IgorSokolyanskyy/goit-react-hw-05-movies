import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../services/Api';
import { Status } from 'constants/status';
import { Item, P } from './Reviews.styled';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErorrMessega/ErorrMessega';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [scroll, setScroll] = useState(0);

  const { movieId } = useParams();

  useEffect(() => {
    setStatus(Status.PENDING);
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      try {
        const { results } = await fetchReviews(movieId, signal);

        if (results.length === 0) {
          alert("💩 We don't have any reviews for this movie.");
          setStatus(Status.IDLE);
          return;
        }

        setReviews(results);
        setScroll(document.documentElement.scrollHeight);
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

  useEffect(() => {
    if (!scroll) {
      return;
    }
    window.scrollTo({
      top: scroll - 240,
      behavior: 'smooth',
    });
  }, [scroll]);

  return (
    <div>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorMessage message={error} />}

      {status === Status.RESOLVED && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <Item key={id}>
              <P>
                <b>Name:</b> {author}
              </P>
              <P>
                <b> Character:</b> {content}
              </P>
            </Item>
          ))}
        </ul>
      )}
    </div>
  );
}
