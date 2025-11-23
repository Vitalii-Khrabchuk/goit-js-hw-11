import { getImagesByQuery } from './js/pixabay-api.js';
import { clearGallery, showLoader, makeMarkup } from './js/render-functions.js';

// ===================================================================
// БАЗА
const form = document.querySelector('.form');
const submitBtn = document.querySelector('button[type=submit]');
const input = document.querySelector('input[name="search-text"]');

submitBtn.disabled = true;

// ===================================================================
// ПОДІЯ інпут
input.addEventListener('input', evt => {
  submitBtn.disabled = evt.target.value.trim() === '';
});
// ===================================================================
// ПОДІЯ сабміт
form.addEventListener('submit', evt => {
  evt.preventDefault();
  showLoader();

  const searchWord = document
    .querySelector('input[name="search-text"]')
    .value.trim();
  if (!searchWord) {
    return;
  }

  clearGallery();

  getImagesByQuery(searchWord)
    .then(makeMarkup)
    .catch(error => console.log(error));
  form.reset();
  submitBtn.disabled = true;
});