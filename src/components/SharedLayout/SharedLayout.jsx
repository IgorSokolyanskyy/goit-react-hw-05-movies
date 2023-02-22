import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Loader from 'components/Loader/Loader';

import { Container, Header, Link } from './SharedLayout.styled';

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
