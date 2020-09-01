import Render from "./Render";

export default class PopupFormContent extends Render {
  constructor(el) {
    super();
    this.parentEl = el;
    this.getAuthForm = this.getAuthForm.bind(this);
    this.getRegistredForm = this.getRegistredForm.bind(this);
  }
  getAuthForm() {
    const formAuth = `
        <form class="popup__form" name="authentication">
            <p id="email" class="popup__name-input">Email</p>
            <input id="email" type="email" name="email" class="popup__input" placeholder="Введите почту" pattern="[a-zA-Z]{1}([A-Za-z0-9_-])*@[a-zA-Z0-9.-]+\.[a-zA-Z]+" required>
            <span id="email" class='popup__valid email'></span>
            <p id="password" class="popup__name-input">Password</p>
            <input id="password" type="password" name="password" class="popup__input" placeholder="Введите пароль" minlength=2 maxlength=30 required>
            <span id="password" class='popup__valid password'></span>
            <span id="submit" class='popup__valid'></span>
            <button type='submit' class="popup__button">Войти</button>
        </form>`;
    this.childEl = formAuth;
    this.renderBeforeend();
  }

  getRegistredForm() {
    const formRegistration = `
        <p id="name" class="popup__name-input">Имя</p>
        <input id="name" type="text" name="text" class="popup__input" placeholder="Введите имя" required>
        <span id="name" class='popup__valid name'></span>`;
    this.childEl = formRegistration;
    this.renderAfterBegin();
  }
}
