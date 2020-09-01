import "./pages/index.css";
import PopupShow from "./js/PopupShow";
import PopupFormContent from "./js/PopupFormContent";
import FormValidation from "./js/FormValidator";

const auth = document.querySelector(".header__authorization-button");
const popup = document.querySelector(".popup");
const popupTitle = document.querySelector(".popup__title");
const popupBtn = document.querySelector(".popup__sign");
const form = document.querySelector("#form");
const validateStringError = {
  validationAbsenceRU: "Обязательное поле",
  validationLenghtRU: "Должно быть от 2 до 30 символов",
  validationMailRU: "Неправильный формат email",
};

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

let mutationObserver = new MutationObserver(function (mutations) {
  console.log(mutations);
  mutations.forEach(function (mutation) {
    const formBtn = form.querySelector(".popup__button");
    const validation = new FormValidation(form, formBtn, validateStringError);
  });
});

mutationObserver.observe(form, {
  childList: true,
});
