import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchReviews } from '../../services/Api';
import { Item, P } from './Reviews.styled';
import Loader from '../Loader/Loader';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      setLoading(true);

      try {
        const { results } = await fetchReviews(movieId, signal);

        setReviews(results);
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
    <div>
      {isLoading && <Loader />}

      {reviews.length ? (
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
      ) : (
        <p
          style={{
            textAlign: 'center',
            margin: 0,
            fontSize: 32,
            color: 'red',
          }}
        >
          We don't have any reviews for this movie
        </p>
      )}

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
    </div>
  );
}
