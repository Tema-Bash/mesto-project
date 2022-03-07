export class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    //метод открытия попапа
    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose); 
    }

    //метод закрытия попапа
    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //метод добавляет слушатель клика крестика/оверлею, для закрытия попапа 
    setEventListeners() { 
        this._popup.addEventListener('mousedown', (evt) => {
            //закрываем по оверлею(магия)
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            //закрываем на крестик
            if (evt.target.classList.contains('popup__close')) {
                this.close()
            }
        }) 
    }
    
    //метод закрытия попапа клавишей Esc
    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this.close()
        }
    }
}