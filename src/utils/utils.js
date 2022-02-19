//утилитарные функции, которые используются в работе сразу нескольких других функций
import {popups} from '../utils/constants.js';

//функции открытия закрытия попапа
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupOnEsc); 
}
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupOnEsc);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      //закрываем по оверлею(магия)
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        //закрываем на крестик
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

function closePopupOnEsc(evt) {
  if (evt.key == 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}