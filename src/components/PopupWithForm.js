import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, {handleFormSubmit}) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form')
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    //метод сбора данных всех полей формы
    _getInputValues() {
        this._formValues = {};
        //добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
        });
        return this._formValues
    }

    //метод закрытия попапа + сброс формы
    close() {
        super.close();
        this._popupForm.reset();
    }

    //обработчик клика иконке закрытия + обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {          
            this._handleFormSubmit(this._getInputValues());
        });
    }
}

