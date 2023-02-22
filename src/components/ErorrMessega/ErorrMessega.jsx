import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import erorr404 from 'images/erorr404.jpg';
import { Box, P } from './ErrorView.styled';

const loaderRoot = document.querySelector('#loader-root');

export default function ErrorView({ message }) {
  return createPortal(
    <Box role="alert">
      <P text={message}>{message}</P>
      <img src={erorr404} width="700" alt="sadcat" />
    </Box>,
    loaderRoot
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
