const profilePopup = document.querySelector('.popup_type_profile');
const cardListPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
const openPopupButtonElement = document.querySelector(".profile__edit")
const popupSaveButtonElement = document.querySelector(".popup__save");
const addCardProfileButtonElement = document.querySelector(".profile__add")
const formElementProfile = document.querySelector(".popup__form_type_profile")
const inputList = Array.from(profilePopup.querySelectorAll(".popup__input"))
const nameInput = document.querySelector(".profile__name")
const jobInput = document.querySelector(".profile__about")

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
}
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
}



profilePopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(profilePopup)})

openPopupButtonElement.addEventListener("click", () => {
  openPopup(profilePopup)
  inputList[0].value = nameInput.textContent;
  inputList[1].value = jobInput.textContent;
})
profilePopup.addEventListener("click",() => {closePopup(profilePopup)})     //закрыть попап при клике вне белого контейнера попапа
profilePopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
})
popupSaveButtonElement.addEventListener("click", () => {closePopup(profilePopup)}) //слушаем кнопку сохранить попапа профиля

const formSubmitHandler = (evt) => {    //сохраняем введеные имя и увлечения
    evt.preventDefault(); 
    nameInput.textContent = inputList[0].value;
    jobInput.textContent = inputList[1].value;
}
formElementProfile.addEventListener('submit', formSubmitHandler); 



addCardProfileButtonElement.addEventListener("click", () => {openPopup(cardListPopup)})
cardListPopup.addEventListener("click",() => {closePopup(cardListPopup)})     //закрыть попап при клике вне белого контейнера попапа
cardListPopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
})
cardListPopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(cardListPopup)})



const initialCards = [    //начальный массив карточек
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
function handleCardLikeClick (event) {  //поставить лайк
  event.target.classList.toggle('card__button_active')
}
function handleCardDeleteClick(event) { //удалить карточку
  event.target.closest('.card').remove()
}
function createCard(link, title) { //создаем карточки
  const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardCloneElement.querySelector('.card__image').src = link;
  cardCloneElement.querySelector('.card__image').alt = title;
  cardCloneElement.querySelector('.card__title').textContent = title;
  cardCloneElement.querySelector('.card__button').addEventListener('click', handleCardLikeClick);
  cardCloneElement.querySelector('.card__delete').addEventListener('click', handleCardDeleteClick);
  cardCloneElement.querySelector('.card__image').addEventListener('click', handleCardBigClick)
  return cardCloneElement
}
function renderCard(cardList, cardCloneElement) { //добавляем карточки в начало страницы
  cardList.prepend(cardCloneElement)
}

initialCards.forEach((item, i) => {     //рендерим начальный массив
  renderCard(cardList, createCard(item.link, item.name))
});

const submitNewCardButton = document.querySelector(".popup__form_type_cards")
const formSaveHandler = (evt) => {  //рендерим новую карточку
  evt.preventDefault();
  closePopup(cardListPopup);
  const inputListCardsPopup = Array.from(cardListPopup.querySelectorAll(".popup__input"))
  renderCard(cardList, createCard(inputListCardsPopup[1].value,inputListCardsPopup[0].value))
}
submitNewCardButton.addEventListener('submit', formSaveHandler); 



function handleCardBigClick (event) {
  openPopup(imagePopup);
  imagePopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(imagePopup)})
  imagePopup.querySelector('.popup__image').src = event.target.src;
  imagePopup.querySelector('.popup__name').textContent = event.target.closest('.card').querySelector('.card__title').textContent;
}
imagePopup.addEventListener("click",() => {closePopup(imagePopup)})     //закрыть попап при клике вне белого контейнера попапа
imagePopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
})

