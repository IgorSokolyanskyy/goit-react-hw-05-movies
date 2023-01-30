import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '31669941-43ed95656cb1213a9578e127d';

export default async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });

  const response = await axios.get(`${BASE_URL}${searchParams}`);

  return response.data;
}
