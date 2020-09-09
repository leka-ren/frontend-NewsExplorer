import Render from "./Render";

export default class NewsCardList extends Render{
  constructor(parentEl) {
    super();
    this.parentEl = parentEl;
    this.addCard = this.addCard.bind(this);
  }

  renderResults(elements) {
    elements.forEach((el) => this.addCard(el));
  }

  renderLoader() {}

  renderError() {}

  showMore() {}

  addCard(articleEl) {
    this.childEl = articleEl.createCard();
    this.renderBeforeend();
    articleEl.setListener();
  }
  
  _setHandlers() {}
}
