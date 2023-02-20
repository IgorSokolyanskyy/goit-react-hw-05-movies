import { Routes, Route } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { addBackToTop } from 'vanilla-back-to-top';

const SharedLayout = lazy(() =>
  import('./components/SharedLayout/SharedLayout')
);
const Home = lazy(() => import('page/Home'));
const Movies = lazy(() => import('page/Movies'));
const MovieDetails = lazy(() => import('page/MovieDetails'));
const NotFound = lazy(() => import('page/NotFound'));
const Cast = lazy(() => import('./components/Cast/Cast'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));

export default function App() {
  useEffect(() => {
    addBackToTop({
      backgroundColor: '#141414ca',
      innerHTML:
        '<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
      textColor: '#fff',
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
