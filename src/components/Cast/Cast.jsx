import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchCast } from 'services/Api';
import { Status } from 'constants/status';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErorrMessega';

import noPhoto from 'images/noPhoto.jpg';
import { List, Img, Item, P } from './Cast.styled';

export default function Cast() {
  const [actors, setActors] = useState(null);
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
        const { cast } = await fetchCast(movieId, signal);

        if (cast.length === 0) {
          toast('💩 No results!', { autoClose: 3000 });
          setStatus(Status.IDLE);
          return;
        }

        setActors(cast);
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

      <ToastContainer rtl />
    </div>
  );
}
