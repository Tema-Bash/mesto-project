import {api} from '../pages/index.js';

export class Section {
  constructor({renderer}, cardListSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(cardListSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  //отрисовывем новую карточку с помощью _renderer
  addItem( cardCloneElement) {
    this._container.prepend(cardCloneElement)
  }

  //отрисовывем начальныее карточки с помощью _renderer
  renderItems(cardsData) {
    cardsData.reverse().forEach(data => {
      this.renderer(data); 
    })
  }
  
}
