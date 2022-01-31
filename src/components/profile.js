const userName = document.querySelector('.profile__name');
export const userAvatarImg = document.querySelector('.profile__image');
const userAbout = document.querySelector('.profile__about');

export let userId;

export const initialProfileRender = (UserData) => {
  userAvatarImg.src = UserData.avatar;
  userName.textContent = UserData.name;
  userAbout.textContent = UserData.about;
  userId = UserData._id;
};

