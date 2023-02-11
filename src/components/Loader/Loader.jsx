import { createPortal } from 'react-dom';
import { RotatingLines } from 'react-loader-spinner';

import { Box } from './Louder.styled';

const loaderRoot = document.querySelector('#loader-root');

export default function Loader() {
  return createPortal(
    <Box>
      <RotatingLines type="Watch" strokeColor="grey" height={100} width={100} />
    </Box>,
    loaderRoot
  );
}
