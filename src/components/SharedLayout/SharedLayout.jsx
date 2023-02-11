import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { Container, Header, Link } from './SharedLayout.styled';
import Loader from 'components/Loader/Loader';

export default function SharedLayout() {
  return (
    <Container>
      <Header>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Container>
  );
}
