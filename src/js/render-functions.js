import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" height="200" />
            </a>
            <div class="gallery-actions">
              <p><span>Likes</span>${likes}</p>
              <p><span>Views</span> ${views}</p>
              <p><span>Comments</span> ${comments}</p>
              <p><span>Downloads</span> ${downloads}</p>
            </div>
          </li>`;
      }
    )
    .join('');

  gallery.innerHTML = galleryMarkup;

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function showLoader() {
  document.querySelector('.loader').classList.add('visually-hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.remove('visually-hidden');
}
