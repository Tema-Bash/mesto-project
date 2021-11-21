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

/*cardList*/

const initialCards = [
  {
    name: 'paris',
    link: 'https://images.pexels.com/photos/9966302/pexels-photo-9966302.jpeg'
  },
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
const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
function handleCardLikeClick (event) {
  event.target.classList.toggle('card__button_active')
}
function handleCardDeleteClick(event) {
  event.target.closest('.card').remove()
}
function createCard(link, title) {
  const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardCloneElement.querySelector('.card__image').src = link;
  cardCloneElement.querySelector('.card__image').alt = title;
  cardCloneElement.querySelector('.card__title').textContent = title;
  cardCloneElement.querySelector('.card__button').addEventListener('click', handleCardLikeClick)
  cardCloneElement.querySelector('.card__delete').addEventListener('click', handleCardDeleteClick)
  return cardCloneElement
}
function renderCard(cardList, cardCloneElement) {
  cardList.prepend(cardCloneElement)
}

initialCards.forEach((items, i) => {
  renderCard(cardList, createCard(initialCards[i].link, initialCards[i].name))
});




/*
<template id="user">
  <div class="user">
    <img class="user__avatar" alt="avatar">
    <p class="user__name"></p>
  </div>
</template> 

const userTemplate = document.querySelector('#user').content;
const usersOnline = document.querySelector('.users-online');
// клонируем содержимое тега template
const userElement = userTemplate.querySelector('.user').cloneNode(true);
// наполняем содержимым
userElement.querySelector('.user__avatar').src = 'tinyurl.com/v4pfzwy';
userElement.querySelector('.user__name').textContent = 'Дюк Корморант';
// отображаем на странице
usersOnline.append(userElement);  
*/


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