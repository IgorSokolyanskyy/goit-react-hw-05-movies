import { useState, useEffect } from 'react';
import Button from '../Button';
import ImageGallery from '../ImageGallery';
import fetchImages from '../Api/images-Api';
import Searchbar from '../Searchbar';
import Notiflix from 'notiflix';
import Loader from '../Loader';
import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLTED: 'resolted',
  REJECTED: 'rejected',
};

export default function App() {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!inputData) {
      return;
    }

    setStatus(Status.PENDING);

    fetchImages(inputData, page)
      .then(data => {
        if (!data.hits.length) {
          setStatus(Status.IDLE);
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {

          setItems(items => [...items, ...data.hits]);
          setTotalHits(data.totalHits);
          setScroll(document.documentElement.scrollHeight);
          setStatus(Status.RESOLTED);
        }
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [inputData, page]);

  useEffect(() => {
    if (!scroll || page === 1) {
      return;
    }
    window.scrollTo({
      top: scroll - 240,
      behavior: 'smooth',
    });
  }, [scroll, page]);

  const handleSubmit = inputData => {
    setInputData(inputData);
    setItems([]);
    setPage(1);
  };

  const getLoadMore = () => {
    setPage(page => page + 1);
  };

  if (status === Status.IDLE) {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
      </div>
    );
  }

  if (status === Status.PENDING) {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery items={items} />
        <Loader />
        {totalHits > 12 && <Button onClick={getLoadMore} />}
      </div>
    );
  }

  if (status === Status.RESOLTED) {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery items={items} />
        {totalHits > 12 && totalHits > items.length && (
          <Button onClick={getLoadMore} />
        )}
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <p>Something wrong, try later</p>
      </div>
    );
  }
}
