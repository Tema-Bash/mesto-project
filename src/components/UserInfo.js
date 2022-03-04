export let userId;

export class initialProfile {
  constructor(UserData) { //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._avatar = document.querySelector(UserData.avatarSelector);
    this._name = document.querySelector(UserData.nameSelector);
    this._about = document.querySelector(UserData.aboutSelector);
  }

  //метод который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем,
  //как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
  getUserInfo(apiData) {
    this._avatar.src = apiData.avatar;
    this._name.textContent = apiData.name;
    this._about.textContent = apiData.about;
    this._id = apiData._id;
    userId = apiData._id;
    return (this, userId);
  }

  //Mетод который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.(взять из modal.js)
  setUserInfo() {

  }
}
