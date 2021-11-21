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
const profilePopup = document.querySelector('.popup_type_profile');
const cardListPopup = document.querySelector('.popup_type_cards');
const imagePopup = document.querySelector('.popup_type_image');
const openPopupButtonElement = document.querySelector(".profile__edit")
const popupSaveButtonElement = document.querySelector(".popup__save");
const addCardProfileButtonElement = document.querySelector(".profile__add")
const formElementProfile = document.querySelector(".popup__form_type_profile")
const submitNewCardButton = document.querySelector(".popup__form_type_cards")
const inputList = Array.from(profilePopup.querySelectorAll(".popup__input"))
const nameInput = document.querySelector(".profile__name")
const jobInput = document.querySelector(".profile__about")
const cardList = document.querySelector('.cards__list'); 
const cardTemplate = document.querySelector('#card-template').content;  
//функции открытия закрытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
}
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
}
//слушатель на "крестик" для закрытия попапа профиля
profilePopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(profilePopup)})
//открываем попап и подтягиваем значения строк из верстки
openPopupButtonElement.addEventListener("click", () => {
  openPopup(profilePopup)
  inputList[0].value = nameInput.textContent;
  inputList[1].value = jobInput.textContent;
})
//закрыть попап профиля при клике вне белого контейнера попапа
profilePopup.addEventListener("click",() => {closePopup(profilePopup)}) 
//экранируем слушатель от внутреннего контейнера, чтобы при клике по белому фону не закрывался попап   
profilePopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
})
//Сохраняем новые введеные данные в шапку профиля
const formSubmitHandler = (evt) => {
  evt.preventDefault(); 
  nameInput.textContent = inputList[0].value;
  jobInput.textContent = inputList[1].value;
  closePopup(profilePopup);
}
formElementProfile.addEventListener('submit', formSubmitHandler); 

addCardProfileButtonElement.addEventListener("click", () => {openPopup(cardListPopup)})
//закрыть попап при клике вне белого контейнера попапа
cardListPopup.addEventListener("click",() => {closePopup(cardListPopup)})
cardListPopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
})
//слушатель на "крестик" для закрытия попапа карточек
cardListPopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(cardListPopup)})
//поставить лайк
function handleCardLikeClick (event) {
  event.target.classList.toggle('card__button_active')
}
//удалить карточку нажатием на корозинку
function handleCardDeleteClick(event) {
  event.target.closest('.card').remove()
}
//создаем карточку
function createCard(link, title) {
  const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardCloneElement.querySelector('.card__image').src = link;
  cardCloneElement.querySelector('.card__image').alt = title;
  cardCloneElement.querySelector('.card__title').textContent = title;
  cardCloneElement.querySelector('.card__button').addEventListener('click', handleCardLikeClick);
  cardCloneElement.querySelector('.card__delete').addEventListener('click', handleCardDeleteClick);
  cardCloneElement.querySelector('.card__image').addEventListener('click', handleCardBigClick)
  return cardCloneElement
}
//добавляем карточку в начало страницы
function renderCard(cardList, cardCloneElement) {
  cardList.prepend(cardCloneElement)
}
//рендерим начальный массив
initialCards.forEach((item, i) => {
  renderCard(cardList, createCard(item.link, item.name))
});

//рендерим новую карточку
const formSaveHandler = (evt) => {
  evt.preventDefault();
  closePopup(cardListPopup);
  const inputListCardsPopup = Array.from(cardListPopup.querySelectorAll(".popup__input"))
  renderCard(cardList, createCard(inputListCardsPopup[1].value,inputListCardsPopup[0].value))
}
submitNewCardButton.addEventListener('submit', formSaveHandler); 

//открываем попап конкретной карточки
function handleCardBigClick (event) {
  openPopup(imagePopup);
  imagePopup.querySelector('.popup__close').addEventListener('click', () => {closePopup(imagePopup)})
  imagePopup.querySelector('.popup__image').src = event.target.src;
  imagePopup.querySelector('.popup__name').textContent = event.target.closest('.card').querySelector('.card__title').textContent;
}
 //закрыть попап при клике вне белого контейнера попапа
imagePopup.addEventListener("click",() => {closePopup(imagePopup)})
imagePopup.querySelector(".popup__container").addEventListener("click", (event) => {
  event.stopPropagation()
})

