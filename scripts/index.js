const popupElement = document.querySelector(".popup")
const openPopupButtonElement = document.querySelector(".profile__edit") //название изменить
const closePopupButtonElement = document.querySelector(".popup__close")
const popupSaveButtonElement = document.querySelector(".popup__save")
const openPopup = (popup) => {
    popup.classList.add("popup_opened");
}
const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
}
openPopupButtonElement.addEventListener("click",() => {openPopup(popupElement)})
closePopupButtonElement.addEventListener("click",() => {closePopup(popupElement)})
popupElement.addEventListener("click",() => {
    closePopup(popupElement)
})
popupElement.querySelector(".popup__container").addEventListener("click", (event) => {
    event.stopPropagation()
})

const formElement = document.querySelector(".popup__form")
const inputList = Array.from(popupElement.querySelectorAll(".popup__input"))
const nameInput = document.querySelector(".profile__name")
const jobInput = document.querySelector(".profile__about")
const formSubmitHandler = (evt) => {
    evt.preventDefault(); 
    nameInput.textContent = inputList[0].value;
    jobInput.textContent = inputList[1].value;
}
formElement.addEventListener('submit', formSubmitHandler); 

const initialCards = [
    {
      name: 'Долгая дорога',
      link: 'images/card-list-trip.jpg'
    },
    {
      name: 'Это электробус',
      link: 'images/card-list-bus.jpg'
    },
    {
      name: 'Водопад',
      link: 'images/card-list-waterfall.jpg'
    },
    {
      name: 'Ночные покатушки',
      link: 'images/card-list-ride.jpg'
    },
    {
      name: 'Загадочный парень',
      link: 'images/card-list-car.jpg'
    },
    {
      name: 'Кэбот Тауэр',
      link: 'images/card-list-cabot.jpg'
    }
  ]; 


/*
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
*/