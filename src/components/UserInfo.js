import {api} from '../pages/index.js';
export class InitialProfile {
  constructor({ imageSelector, nameSelector, aboutSelector }) { //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._AvatarSrc = document.querySelector(imageSelector) 
    this._Name = document.querySelector(nameSelector) 
    this._About = document.querySelector(aboutSelector) 
  }

  //метод который возвращает объект с данными пользователя
  getUserInfo() {
    return api.getUser()
      .then((user) => {
      this.id = user._id;
      this.name = user.name;
      this.about = user.about;
      this.avatar = user.avatar;
      this.cohort = user.cohort;
    })
  }

  //Mетод который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.(взять из modal.js)
  setUserInfo(UserData) {
    this._AvatarSrc.src = UserData.avatar;
    this._Name.textContent = UserData.name; //имя с сервера
    this._About.textContent = UserData.about; //Абоут с сервера
  }
}