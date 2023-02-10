import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '2ac3f085729a6d415a45dd563d848739',
    language: 'en-US',
  },
});

const fetchTrendsMovies = async signal => {
  const { data } = await AXIOS.get(`trending/movie/day`, { signal });
  const trends = data.results;

  return trends;
};

const fetchMovieById = async (id, signal) => {
  const { data } = await AXIOS.get(`/movie/${id}`, { signal });

  return data;
};

const fetchCast = async (id, signal) => {
  const { data } = await AXIOS.get(`/movie/${id}/credits`, { signal });

  return data;
};

const fetchReviews = async (id, signal) => {
  const { data } = await AXIOS.get(`/movie/${id}/reviews`, { signal });

  return data;
};

const fetchMoviesBySearch = async searchQuery => {
  const { data } = await AXIOS.get(`search/movie?query=${searchQuery}`);
  const results = data.results;

  return results;
};

export {
  fetchTrendsMovies,
  fetchMovieById,
  fetchCast,
  fetchReviews,
  fetchMoviesBySearch,
};
