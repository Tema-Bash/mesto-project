const userName = document.querySelector('.profile__name');
export const userAvatarImg = document.querySelector('.profile__image');
const userAbout = document.querySelector('.profile__about');

export let userId;

export const initialProfileRender = (UserData) => {
  userAvatarImg.src = UserData.avatar; //устанавливаем автарку с сервера
  userName.textContent = UserData.name; //имя с сервера
  userAbout.textContent = UserData.about; //Абоут с сервера
  userId = UserData._id;  //id с сервера
};

