import MoviePreview from '../MoviePreview/MoviePreview';
import { useLocation } from 'react-router-dom';
import { Item, List, StyledLink } from './MovieList.styled';
import PropTypes from 'prop-types';

export default function MovieList({ movies }) {
  const navigate = useLocation();

  return (
    <List>
      {movies.map(({ id, title, name, poster_path }) => (
        <Item key={id}>
          <StyledLink to={`/movies/${id}`} state={{ from: navigate }}>
            <MoviePreview title={title || name} poster={poster_path} />
          </StyledLink>
        </Item>
      ))}
    </List>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ),
};
