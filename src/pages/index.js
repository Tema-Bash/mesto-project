//инициализацию JS-кода, добавление слушателей и другие важные участки оставить тут
import '../pages/index.css';
import {enableValidation} from '../components/validate.js';
import {openPopupNewCard, openPopupProfileUpdate, openPopupAvatarChange} from "../components/modal.js"
import {renderInitialArray} from "../components/card.js";
import {initialProfileRender} from '../components/profile.js';
import {config, options} from '../utils/constants.js';
import {Api} from '../components/Api.js';

//вызов классов
export const api = new Api(config);

enableValidation(options);  

//вешаем слушатели для открытия попапов
openPopupNewCard()
openPopupProfileUpdate();
openPopupAvatarChange();

//грузим данные с сервера и рендерим их
api.getAppInfo()
  .then(([user, cards]) => {
    initialProfileRender(user);
    renderInitialArray(cards);
  })
  .catch(err => console.log(err));


