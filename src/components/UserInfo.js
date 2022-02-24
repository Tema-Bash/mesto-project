/*UserData = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  imageSelector: '.profile__image',
}*/

export class initialProfile {
  constructor(UserData) { //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._avatar = UserData.avatar;
    this._textContent = UserData.name; //имя с сервера
    this._textContent = UserData.about; //Абоут с сервера
    this.userId = UserData._id;  //id с сервера
  }

  //метод который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем,
  //как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
  getUserInfo() {
    return this
  }

  //Mетод который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.(взять из modal.js)
  setUserInfo() {

  }
}
//---------------------------------------------------------------------------------------------------------------------------
/*const userName = document.querySelector('.profile__name');
export const userAvatarImg = document.querySelector('.profile__image');
const userAbout = document.querySelector('.profile__about');

export let userId;

export const initialProfileRender = (UserData) => {
  userAvatarImg.src = UserData.avatar; //устанавливаем автарку с сервера
  userName.textContent = UserData.name; //имя с сервера
  userAbout.textContent = UserData.about; //Абоут с сервера
  userId = UserData._id;  //id с сервера
};*/