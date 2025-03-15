import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49327734-00ffb8023b77f666b7f6e293e';

export function getData(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => response.data.hits)
    .catch(error => {
      throw error;
    });
}
