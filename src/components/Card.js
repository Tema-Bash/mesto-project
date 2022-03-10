//класс Card - код, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
  //принимает в конструктор её данные и селектор её template-элемента;
  constructor({ data, handleCardBigClick ,handleLike, handleDelete}, userId, templateSelector){
    this._selector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = userId;

    this._handledelete = handleDelete
    this._handleCardBigClick = handleCardBigClick;
    this._handleCardLikeClick = handleLike;
  }

  //возвращает шаблон разметки
  _getElement() {
    return document
      .querySelector(this._selector) 
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  isLiked(){
    return Boolean(this._likes.find(user => user._id === this._currentUserId))
  }

  //Работаем с разметкой собираем все компоненты карточки
  generate () {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.card__image') 
    this._likeButton = this._element.querySelector('.card__button')
    this._deleteButton = this._element.querySelector('.card__delete')
    this._cardLikes = this._element.querySelector('.card__likes')
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._cardLikes.textContent = this._likes.length;
    this._element.querySelector('.card__title').textContent = this._name;
    
    //отображение моих лайков
    if(this.isLiked()){
      this._likeButton.classList.toggle('card__button_active') //Ищем иконку лайка в каждой отдельной карточке
    }

    //отображение иконки корзинки если карточка наша
    const isOwner = this._ownerId === this._currentUserId;
    if(!isOwner){
      this._deleteButton.classList.add('card__delete_visibility_hidden');
    };
    //вызываем обработчики
    this._setEventListeners();

    return this._element;
  }

  //вешаем обработчики
  _setEventListeners() {
    this._elementImage.addEventListener('click', this._handleCardBigClick);
    this._likeButton.addEventListener('click', () => this._handleCardLikeClick(this));
    this._deleteButton.addEventListener('click', () => this._handleCardDeleteClick());
  }

  //обновляем лайки в вёрстке
  updateLikes(res){
    this._likes = res.likes;
    this._cardLikes.textContent = res.likes.length;
    this._likeButton.classList.toggle('card__button_active')
  }

  //удаляем карточку
  _handleCardDeleteClick() {
    this._handledelete(this); //удаляем с сервера
  }
}
