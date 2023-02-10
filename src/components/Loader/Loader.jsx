import { createPortal } from 'react-dom';
import { Watch } from 'react-loader-spinner';

import { Box } from './Louder.styled';

const loaderRoot = document.querySelector('#loader-root');

export default function Loader() {
  return createPortal(
    <Box>
      <Watch type="Watch" color="#0fed1e" height={100} width={100} />
    </Box>,
    loaderRoot
  );
}
