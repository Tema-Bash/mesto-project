//класс Card - код, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
  //принимает в конструктор её данные и селектор её template-элемента;
  constructor({ data, handleCardBigClick ,handleCardLikeClick,  handleCardDeleteClick}, userId, templateSelector){
    this._selector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = userId;

    this._handleCardBigClick = handleCardBigClick;
    this._handleCardLikeClick = handleCardLikeClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
  }

  //возвращает шаблон разметки
  _getElement() {
    return document
      .querySelector(this._selector) 
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  //Работаем с разметкой собираем все компоненты карточки
  generate () {
    this._element = this._getElement();
    const _elementImage = this._element.querySelector('.card__image')
    _elementImage.src = this._link;
    _elementImage.alt = this._name;
    this._element.querySelector('.card__likes').textContent = this._likes.length;
    this._element.querySelector('.card__title').textContent = this._name;
    
    //отображение моих лайков
    const isLiked = Boolean(this._likes.find(user => user._id === this._currentUserId));
    if(isLiked){
      this._element.querySelector('.card__button').classList.toggle('card__button_active')
    }

    //отображение иконки корзинки если карточка наша
    const isOwner = this._ownerId === this._currentUserId;
    if(!isOwner){
      this._element.querySelector('.card__delete').classList.add('card__delete_visibility_hidden');
    };
    //вызываем обработчики
    this._setEventListeners();

    return this._element;
  }

  //вешаем обработчики
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', this._handleCardBigClick);
    this._element.querySelector('.card__delete').addEventListener('click', (evt) => this._handleCardDeleteClick(evt, this._cardId));
    this._element.querySelector('.card__button').addEventListener('click', (evt) => this._handleCardLikeClick(evt, this._cardId));
  }
}