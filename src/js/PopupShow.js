export default class PopupShow {
  constructor(popupElement) {
    this.el = popupElement;
    this.popupTitle = this.el.querySelector(".popup__title");
    this.signBtn = this.el.querySelector(".popup__sign-button");
    this.form = popupElement.querySelector("form");
    this._escKey = this._escKey.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.resetContent = this.resetContent.bind(this);
    this.setEventListener();
  }

  open() {
    this.el.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._escKey);
  }

  close() {
    document.removeEventListener("keydown", this._escKey);
    this.el.classList.remove("popup_is-opened");
    this.resetContent();
  }

  clearForm() {
    while (this.form.firstChild) {
      this.form.removeChild(this.form.firstChild);
    }
  }

  resetContent() {
    this.signBtn.textContent = "Зарегистрироваться";
    this.popupTitle.textContent = "Вход";
    this.clearForm();
  }

  setEventListener() {
    this.el
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  }

  _escKey(event) {
    if (event.key === "Escape") this.close();
  }
}
