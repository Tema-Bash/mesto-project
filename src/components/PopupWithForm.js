import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    //метод сбора данных всех полей формы
    _getInputValues() {
        this._inputList = document.querySelectorAll('.popup__input');
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
        this._popupSelector.querySelector('.popup__form').reset();
    }

    //обработчик клика иконке закрытия + обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (event) => {          
            this._handleFormSubmit(this._getInputValues());
        });
    }
}

