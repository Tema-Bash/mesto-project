import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup, imageSelector, nameSelector) {
        super(popup);
        this._imageSelector = document.querySelector(imageSelector);
        this._nameSelector = document.querySelector(nameSelector);
    }

    //метод открытия попапа с изображением карточки
    open(event) {
            super.open();
            this._imageSelector.src = event.target.src;
            this._imageSelector.alt = event.target.alt;
            this._nameSelector.textContent = event.target.alt;
    }
}