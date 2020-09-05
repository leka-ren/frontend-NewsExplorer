import Render from "./Render";
const imageCard = require("../../images/save.svg");

export default class NewsCard extends Render {
  constructor(el) {
    super();
    this.parentEl = el;
  }

  //renderIcon() {}

  formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    })}, ${date.getFullYear()}`;
  }

  createCard(dataCard) {
    const card = `
    <div class="resoult__card">
        <div class="resoult__card-save-content">
            <p class="resoult__card-alert-text">Войдите, чтобы сохранять статьи</p>
            <button class="resoult__card-save-button">
                <img class="resoult__card-svg-save" src="${imageCard}"
                alt="кнопка сохранения статьи">
            </button>
        </div>
        <a href="${dataCard.url}" target="_blank">
            <img class="resoult__card-image" src="${dataCard.urlToImage}"
                alt="Новостное изображение">
            <div class="resoult__card-text-content">
                <p class="resoult__card-data">${this.formatDate(
                  dataCard.publishedAt
                )}</p>
                <h3 class="resoult__card-title">${dataCard.title}</h3>
                <article class="resoult__card-text">${
                  dataCard.description
                }</article>
                <p class="resoult__card-resourse">${dataCard.source.name}</p>
            </div>
        </a>
    </div>
    `;
    this.childEl = card;
    this.renderBeforeend(this.parentEl, this.childEl);
  }
}
