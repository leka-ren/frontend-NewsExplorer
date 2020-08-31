import "./pages/index.css";
import PopupShow from "./js/PopupShow";
import PopupFormContent from "./js/PopupFormContent";

const auth = document.querySelector(".header__authorization-button");
const popup = document.querySelector(".popup");
const popupTitle = document.querySelector(".popup__title");
const popupBtn = document.querySelector(".popup__sign");
const form = document.querySelector("#form");
const statePopup = new PopupShow(popup);
const authForm = new PopupFormContent(form);

function showPopup(event) {
  authForm.getAuthForm();
  statePopup.open();
}

function popupReg(event) {
  if (event.target.textContent === "Зарегистрироваться") {
    event.target.textContent = "Войти";
    popupTitle.textContent = "Регистрация";
    form.querySelector(".popup__button").textContent = "Зарегистрироваться";
    authForm.getRegistredForm();
  } else if (event.target.textContent === "Войти") {
    event.target.textContent = "Зарегистрироваться";
    popupTitle.textContent = "Вход";
    form.querySelector(".popup__button").textContent = "Войти";
    document.querySelectorAll("#name").forEach((el) => el.remove());
  }
}

auth.addEventListener("click", showPopup);
popupBtn.addEventListener("click", popupReg);
