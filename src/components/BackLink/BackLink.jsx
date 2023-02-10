import { HiArrowLeft } from 'react-icons/hi';
import { StyledLink } from './BackLink.styled';

import PropTypes from 'prop-types';

export default function BackLink({ to, children }) {
  return (
    <StyledLink to={to}>
      <HiArrowLeft size="24" />
      {children}
    </StyledLink>
  );
}

BackLink.propTypes = {
  to: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
};
