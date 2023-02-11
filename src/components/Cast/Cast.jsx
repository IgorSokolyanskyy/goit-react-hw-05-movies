import { useState, useEffect } from 'react';
import { fetchCast } from '../../services/Api';
import { useParams } from 'react-router-dom';
import { List, Img, Item, P } from './Cast.styled';

import noPhoto from 'images/noPhoto.jpg';
import Loader from '../Loader/Loader';
import { Status } from 'constants/status';
import ErrorMessage from '../ErorrMessega/ErorrMessega';

export default function Cast() {
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const { movieId } = useParams();

  useEffect(() => {
    setStatus(Status.PENDING);
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      try {
        const { cast } = await fetchCast(movieId, signal);

        if (cast.length === 0) {
          alert('💩 No results!');
          setStatus(Status.IDLE);
          return;
        }

        setActors(cast);
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

  const BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  return (
    <div>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorMessage message={error} />}

      {status === Status.RESOLVED && (
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
      )}
    </div>
  );
}
