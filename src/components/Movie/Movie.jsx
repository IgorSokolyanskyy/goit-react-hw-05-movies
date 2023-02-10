import { Article, MovieInfo, Title, Img } from './Movie.styled';
import { useLocation, NavLink } from 'react-router-dom';
import noPhoto from 'images/noPhoto.jpg';
import PropTypes from 'prop-types';

export default function Movie({ movie }) {
  const {
    title,
    name,
    release_date,
    vote_average,
    poster_path,
    overview,
    genres,
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : noPhoto;

  const rating = Math.round(vote_average * 10) / 10;

  const navigate = useLocation();
  const backLinkHref = navigate.state?.from ?? '/';

  return (
    <Article>
      <Img src={posterUrl} alt={title} title={title} />

      <MovieInfo>
        <Title>
          {title || name}{' '}
          {release_date ? (
            <span>({release_date.substring(0, 4)})</span>
          ) : (
            <span>(N/A)</span>
          )}
        </Title>

        <p>
          <b> User score: </b>{' '}
          {vote_average ? <span>{rating} / 10</span> : <span>N/A</span>}
        </p>

        <p>
          <b>Overview:</b>{' '}
          {overview ? <span>{overview}</span> : <span>N/A</span>}
        </p>

        <b>Genres:</b>
        {genres.length ? (
          <ul>
            {genres.map(({ id, name }) => (
              <li key={id}>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span>N/A</span>
        )}

        <hr />

        <div>
          <h2>Additional Information</h2>

          <NavLink to="cast" state={{ from: backLinkHref }}>
            <p>Cast</p>
          </NavLink>

          <NavLink to="reviews" state={{ from: backLinkHref }}>
            <p>Reviews</p>
          </NavLink>
        </div>
      </MovieInfo>
    </Article>
  );
}

Movie.defaultProps = {
  movie: PropTypes.shape({
    release_date: '',
    vote_average: 0,
    poster_path: noPhoto,
    overview: '',
    genres: [],
  }),
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
};
