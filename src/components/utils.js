//утилитарные функции, которые используются в работе сразу нескольких других функций

//функции открытия закрытия попапа
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupOnEsc); 
}
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupOnEsc);
}
//закрытие на "крестик"
export const closeButton = (popup) => {
  popup.querySelector('.popup__close').addEventListener('click', () => {closePopup(popup)});
}

//закрытие попапа при вклике вне поля модального окна
export const clickOutClosePopup = (popup) => {
  popup.addEventListener("click",() => {closePopup(popup)})  
  popup.querySelector(".popup__container").addEventListener("click", (event) => {
    event.stopPropagation()
  });
}

//закрываем попапы на Esc

function closePopupOnEsc(evt) {
  if (evt.key == 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}