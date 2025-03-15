import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getData } from './js/pixabay-api';
import {
  clearGallery,
  renderGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('form');
const input = document.querySelector("input[name='search-text']");
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const errorMessage = {
  title: 'Error',
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  position: 'topRight',
  backgroundColor: '#ef7975',
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.show(errorMessage);
    return;
  }

  clearGallery();
  showLoader();

  getData(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.show(errorMessage);
        return;
      }

      renderGallery(images);
    })

    .catch(() => {
      iziToast.show({
        title: 'Error',
        message: 'Something went wrong! Please try again later.',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
});
