import { Img, P } from './MoviePreview.styled';
import noPhoto from 'images/noPhoto.jpg';

import PropTypes from 'prop-types';

export default function MoviePreview({ title, poster }) {
  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : noPhoto;

  return (
    <>
      <Img src={posterUrl} alt={title} />
      <P>{title}</P>
    </>
  );
}

MoviePreview.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};
