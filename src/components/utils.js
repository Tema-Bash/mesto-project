//утилитарные функции, которые используются в работе сразу нескольких других функций

//функции открытия закрытия попапа
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
}
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
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
export const closePopupOnEsc = () => {
  document.addEventListener('keyup', (btn) => {
    const popupOpened = document.querySelector('.popup_opened');
    if (btn.key == 'Escape' && popupOpened) {
      closePopup(popupOpened);
    }
  });  
}



