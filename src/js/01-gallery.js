import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';

// Change code below this line
console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');
const galleryCards = creatGalaryCards(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', galleryCards);

galleryRef.addEventListener('click', onImgSmallClick);

function creatGalaryCards(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
            <a class="gallery__item" href="${original}">
               <img
                class="gallery__image"
                src="${preview}" 
                alt="${description}"
                />
            </a>
      `;
    })
    .join('');
}

function onImgSmallClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
