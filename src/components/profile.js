import {
userName,
userAvatarImg,
userAbout } from '../utils/constants.js';
export let userId;

export const initialProfileRender = (UserData) => {
  userAvatarImg.src = UserData.avatar;
  userName.textContent = UserData.name;
  userAbout.textContent = UserData.about;
  userId = UserData._id;
};

