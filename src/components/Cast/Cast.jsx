import { useState, useEffect } from 'react';
import { fetchCast } from '../../services/Api';
import { useParams } from 'react-router-dom';
import { List, Img, Item, P } from './Cast.styled';

import noPhoto from 'images/noPhoto.jpg';
import Loader from '../Loader/Loader';

export default function Cast() {
  const [actors, setActors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      setLoading(true);

      try {
        const { cast } = await fetchCast(movieId, signal);

        setActors(cast);
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

  const BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  return (
    <div>
      {isLoading && <Loader />}

      {actors.length ? (
        <List>
          {actors.map(({ cast_id, profile_path, name, character }) => (
            <Item key={cast_id}>
              <Img
                src={profile_path ? `${BASE_URL}${profile_path}` : noPhoto}
                alt={name}
              />
              <P>
                Name: <b>{name}</b>
              </P>
              <P>
                Character: <b>{character}</b>
              </P>
            </Item>
          ))}
        </List>
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
