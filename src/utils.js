//утилитарные функции, которые используются в работе сразу нескольких других функций

//функции открытия закрытия попапа
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
}
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
}

//закрываем попапы на Esc
document.addEventListener('keyup', (btn) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (btn.key == 'Escape' && popupOpened) {
    closePopup(popupOpened);
  }
});


//закрытие попапа при вклике вне поля модального окна

