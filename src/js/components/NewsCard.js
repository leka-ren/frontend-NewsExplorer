const iconSave = require("../../images/save.svg");
const iconDelete = require("../../images/trash.svg");

export default class NewsCard {
  constructor(dataCard, keyword, api, icon) {
    this.icon = icon;
    this.dataCard = dataCard;
    this.keyword = keyword;
    this.date = this.formatDate(this.dataCard.publishedAt);
    this.api = api;
    this.createCard = this.createCard.bind(this);
    this.id = "i" + Math.floor(Math.random() * 42424242);
    this.createCard = this.createCard;
    this.saveArticle = this.saveArticle.bind(this);
    this.getObjects = this.getObjects.bind(this);
  }

  getObjects() {
    return {
      keyword: this.keyword,
      title: this.dataCard.title,
      text: this.dataCard.description,
      date: this.date,
      source: this.dataCard.source.name,
      link: this.dataCard.url,
      image: this.dataCard.urlToImage,
    };
  }

  alertIconMessage() {
    if (localStorage.getItem("username")) {
      return "";
    } else {
      return `<p class="resoult__card-alert-text">Войдите, чтобы сохранять статьи</p>`;
    }
  }

  iconRender() {
    const icon = this.icon === "save" ? iconSave : iconDelete;
    return icon;
  }

  renderIcon() {
    return `${this.alertIconMessage()}
    <button class="resoult__card-save-button">
      <img class="resoult__card-svg-save" src="${this.iconRender()}"
      alt="кнопка сохранения статьи">
    </button>`;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    })}, ${date.getFullYear()}`;
  }

  setListener() {
    if (this.icon === "save") {
      this.articleCard = document.querySelector(`#${this.id}`);
      this.saveBtn = this.articleCard.querySelector(
        ".resoult__card-save-button"
      );
      this.saveBtn.addEventListener("click", this.saveArticle);
    }
  }

  saveArticle() {
    this.api.createArticle(this.getObjects());
  }

  createCard() {
    const card = `
    <div id=${this.id} class="resoult__card">
        <div class="resoult__card-save-content">
            ${this.renderIcon()}
        </div>
        <a href="${this.dataCard.url}" target="_blank">
            <img class="resoult__card-image" src=${this.dataCard.urlToImage === null ? `https://starwarsblog.starwars.com/wp-content/uploads/2020/01/marvel-darth-vader-tall.jpg` : this.dataCard.urlToImage}
                alt="Новостное изображение">
            <div class="resoult__card-text-content">
                <p class="resoult__card-data">${this.date}</p>
                <h3 class="resoult__card-title">${this.dataCard.title}</h3>
                <article class="resoult__card-text">${
                  this.dataCard.description
                }</article>
                <p class="resoult__card-resourse">${
                  this.dataCard.source.name
                }</p>
            </div>
        </a>
    </div>
    `;
    return card;
  }
}
