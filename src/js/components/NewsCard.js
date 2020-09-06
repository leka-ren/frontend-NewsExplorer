const iconSave = require("../../images/save.svg");
const iconDelete = require("../../images/trash.svg");
const blueIconSave = require("../../images/bookmark.svg");

export default class NewsCard {
  constructor(dataCard, keyword, api, icon, page) {
    this.icon = icon;
    this.dataCard = dataCard;
    this.keyword = keyword;
    this.date = this._formatDate(
      this.dataCard.publishedAt || this.dataCard.date
    );
    this.api = api;
    this.createCard = this.createCard.bind(this);
    this.id = "i" + Math.floor(Math.random() * 42424242);
    this.createCard = this.createCard;
    this.idRemove = "";
    this._actArticle = this._actArticle.bind(this);
    this._getObjects = this._getObjects.bind(this);
    this._themeShow = this._themeShow.bind(this);
    this._getId = this._getId.bind(this);
  }

  _getObjects() {
    return {
      keyword: this.keyword,
      title: this.dataCard.title,
      text: this.dataCard.description,
      date: this.dataCard.publishedAt,
      source: this.dataCard.source.name,
      link: this.dataCard.url,
      image:
        this.dataCard.urlToImage === null
          ? `https://starwarsblog.starwars.com/wp-content/uploads/2020/01/marvel-darth-vader-tall.jpg`
          : this.dataCard.urlToImage,
    };
  }

  _alertIconMessage() {
    if (localStorage.getItem("username")) {
      return "";
    } else {
      return `<p class="resoult__card-alert-text">Войдите, чтобы сохранять статьи</p>`;
    }
  }

  _iconRender() {
    const icon = this.icon === "save" ? iconSave : iconDelete;
    return icon;
  }

  _renderIcon() {
    return `${this._alertIconMessage()}
    <button class="resoult__card-save-button">
      <img class="resoult__card-svg-save" src="${this._iconRender()}"
      alt="кнопка сохранения статьи">
    </button>`;
  }

  _formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    })}, ${date.getFullYear()}`;
  }

  setListener() {
    this.articleCard = document.querySelector(`#${this.id}`);
    this.saveBtn = this.articleCard.querySelector(".resoult__card-save-button");
    this.saveBtn.addEventListener("click", this._actArticle);
  }

  _getId(id) {
    this.idRemove = id;
  }

  _actArticle() {
    let icon = this.saveBtn.querySelector(".resoult__card-svg-save");
    let urlIcon = icon.src.slice(22);
    if (this.icon === "save" && urlIcon != blueIconSave) {
      if (urlIcon === blueIconSave) {
        icon.src = iconSave;
      } else {
        this.api
          .createArticle(this._getObjects())
          .then((res) => this._getId(res.data._id));
        console.log(this.idRemove);
        icon.src = blueIconSave;
      }
    } else if (this.icon === "trash" || urlIcon === blueIconSave) {
      if (this.dataCard._id) {
        this.api.removeArticle(this.dataCard._id);
        this.saveBtn.removeEventListener("click", this._actArticle);
        this.articleCard.remove();
      } else {
        this.api.removeArticle(this.idRemove).then((res) => console.log(res));
      }
    }
  }

  _themeShow() {
    if (this.dataCard.keyword) {
      return `<p class="resoult__card-theme-content">${this.dataCard.keyword}</p>`;
    } else {
      return "";
    }
  }

  createCard() {
    const card = `
    <div id=${this.id} class="resoult__card">
        ${this._themeShow()}
        <div class="resoult__card-save-content">
            ${this._renderIcon()}
        </div>
        <a href="${this.dataCard.url || this.dataCard.link}" target="_blank">
            <img class="resoult__card-image" src=${
              this.dataCard.urlToImage || this.dataCard.image
            }
                alt="Новостное изображение">
            <div class="resoult__card-text-content">
                <p class="resoult__card-data">${this.date}</p>
                <h3 class="resoult__card-title">${this.dataCard.title}</h3>
                <article class="resoult__card-text">${
                  this.dataCard.description || this.dataCard.text
                }</article>
                <p class="resoult__card-resourse">${
                  this.dataCard.source.name || this.dataCard.source
                }</p>
            </div>
        </a>
    </div>
    `;
    return card;
  }
}
