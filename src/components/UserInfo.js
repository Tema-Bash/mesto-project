export class UserInfo {
  constructor({ imageSelector, nameSelector, aboutSelector }, {fillInfo}) { //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._avatarSrc = document.querySelector(imageSelector) 
    this._name = document.querySelector(nameSelector) 
    this._about = document.querySelector(aboutSelector)
    this._fillInfo = fillInfo
  }

  //метод который возвращает объект с данными пользователя
  getUserInfo() {
    return this._fillInfo()
  }

  //Mетод который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.(взять из modal.js)
  setUserInfo({ name, about, avatar, _id }) {
    this._avatarSrc.src = avatar;
    this._name.textContent = name; //имя с сервера
    this._about.textContent = about; //Абоут с сервера
    this._id = _id;
  }
}
/*Можно лучше 
Хоть в задании и просят использовать api в этом классе, но на самом деле составители ошиблись и это скоро исправят.
лучше удалить все вызовы апи из класса. Тут нужно просто получать данные из textContent

getUserInfo() {
  return {
    name: this._name.textContent,
    about: this._about.textContent
  }
}
*/