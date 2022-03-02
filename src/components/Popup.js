export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    //метод открытия попапа
    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose.bind(this)); 
    }

    //метод закрытия попапа
    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    //метод добавляет слушатель клика крестика/оверлею, для закрытия попапа 
    setEventListeners() { 
        this._popupSelector.addEventListener('mousedown', (evt) => {
            //закрываем по оверлею(магия)
            console.log(this._popupSelector)
            if (evt.target.classList.contains('popup_opened')) {
                //console.log(this)
                this.close();
            }
            //закрываем на крестик
            if (evt.target.classList.contains('popup__close')) {
                this.close()
                this._popupSelector.classList.remove("popup_opened");
                console.log(this.close())
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