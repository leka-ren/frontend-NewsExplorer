import Render from "./Render";

export default class Popup extends Render {
  constructor(el) {
    super();
    this.parentEl = el.querySelector("form");
    this.signBtn = el.querySelector("#sign-btn");
    this.popupTitle = el.querySelector(".popup__title");
    this.formBtn = el.querySelector("form button");
    this.getRegistredForm = this.getRegistredForm.bind(this);
    this.stateFields = this.stateFields.bind(this);
  }

  getRegistredForm() {
    const formRegistration = `
        <p id="name" class="popup__name-input">Имя</p>
        <input id="name" type="text" name="name" class="popup__input" placeholder="Введите имя" required>
        <span id="name" class='popup__valid name'></span>`;
    this.childEl = formRegistration;
    this.renderAfterBegin();
  }

  stateFields(signBtnText, titleText, formBtnText) {
    this.signBtn.textContent = signBtnText;
    this.popupTitle.textContent = titleText;
    this.formBtn.textContent = formBtnText;
  }

  removeRegForm(inputGroup) {
    inputGroup.forEach((el) => el.remove());
  }

  clearSpanError() {}
}
