import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup, image, name) {
        super(popup);
        this._image = this._popup.querySelector(image);
        this._name = this._popup.querySelector(name);
    }

    //метод открытия попапа с изображением карточки
    open(event) {
            super.open();
            this._image.src = event.target.src;
            this._image.alt = event.target.alt;
            this._name.textContent = event.target.alt;
    }
}