import Render from "../Render";

export default class Popup extends Render {
  constructor(el) {
    super();
    this.parentEl = el;
    this.getRegistredForm = this.getRegistredForm.bind(this);
    this.getRegistredForm();
  }

  getRegistredForm() {
    const formRegistration = `
        <p id="name" class="popup__name-input">Имя</p>
        <input id="name" type="text" name="name" class="popup__input" placeholder="Введите имя" required>
        <span id="name" class='popup__valid name'></span>`;
    this.childEl = formRegistration;
    this.renderAfterBegin();
  }
}