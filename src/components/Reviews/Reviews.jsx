import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchReviews } from 'services/Api';
import { Status } from 'constants/status';
import ErrorMessage from 'components/ErorrMessega';
import Loader from 'components/Loader';

import { Item, P } from './Reviews.styled';

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
          toast(' We dont have any reviews for this movie 💩', {
            autoClose: 3000,
          });

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

      <ToastContainer rtl />
    </div>
  );
}
