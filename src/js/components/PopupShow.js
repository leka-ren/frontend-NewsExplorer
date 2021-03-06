export default class PopupShow {
  constructor(popupElement) {
    this.el = popupElement;
    this.popupTitle = this.el.querySelector(".popup__title");
    this.signBtn = this.el.querySelector(".popup__sign-button");
    this.form = popupElement.querySelector("form");
    this.popBtn = this.form.querySelector("button");
    this._escKey = this._escKey.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._background = this._background.bind(this);
    this.resetContent = this.resetContent.bind(this);
    this.setEventListener();
  }

  open() {
    this.el.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._escKey);
    this.el.addEventListener("click", this._background);
  }

  close() {
    document.removeEventListener("keydown", this._escKey);
    this.el.classList.remove("popup_is-opened");
    this.resetContent();
  }

  resetContent() {
    if (this.el.querySelector("#name")) {
      this.el.querySelectorAll("#name").forEach((el) => el.remove());
    };
    this.form.querySelectorAll("span").forEach((el) => el.textContent = "");
    this.form.querySelectorAll("input").forEach((el) => el.value = "");
    this.popBtn.textContent = "Войти"
    this.signBtn.textContent = "Зарегистрироваться";
    this.popupTitle.textContent = "Вход";
  }

  setEventListener() {
    this.el
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  }

  _escKey(event) {
    if (event.key === "Escape") this.close();
  }

  _background(event) {
    if (event.target.className === "popup__background") this.close(); 
  }
}
