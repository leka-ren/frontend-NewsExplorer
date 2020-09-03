import "./pages/index.css";
import PopupShow from "./js/components/PopupShow";
import Popup from "./js/components/Popup";
import FormValidation from "./js/FormValidator";
import MainApi from "./js/api/MainApi";

const url = "https://www.api.newsexpo.ml";
const test = new MainApi(url);
async function sign() {
  await test.signin("kek@lol.com", "qwerty12345");
  test.getUserData();
}
sign();

const authBtn = document.querySelector("#auth-btn");
const popup = document.querySelector(".popup");
const popupTitle = document.querySelector(".popup__title");
const form = popup.querySelector("#form");
const formBtn = form.querySelector("button");
const signBtn = popup.querySelector("#sign-btn");
const validateStringError = {
  validationAbsenceRU: "Обязательное поле",
  validationLenghtRU: "Должно быть от 2 до 30 символов",
  validationMailRU: "Неправильный формат email",
};

const popupShow = new PopupShow(popup);
const formValidate = new FormValidation(form, formBtn, validateStringError);

function popupOpen(event) {
  popupShow.open();
}

function signBtnEvent(event) {
  if (event.target.textContent === "Зарегистрироваться") {
    const nameInput = new Popup(form);
    signBtn.textContent = "Войти";
    popupTitle.textContent = "Регистрация";
    formBtn.textContent = "Зарегистрироваться";
  } else if (event.target.textContent === "Войти") {
    document.querySelectorAll("#name").forEach((el) => el.remove());
    signBtn.textContent = "Зарегистрироваться";
    popupTitle.textContent = "Вход";
    formBtn.textContent = "Войти";
  }
}

function takeDate(event) {
  const input = form.querySelectorAll("input");
  let inputVal = [];
  event.preventDefault();
  input.forEach((el) => inputVal.push(el.value));
  if (input.length === 2) {
    console.log("signin");
  } else if (input.length === 3) {
    console.log("signup");
  } else {
    alert("Error");
  }
}

authBtn.addEventListener("click", popupOpen);
signBtn.addEventListener("click", signBtnEvent);
formValidate.setEventListeners();
formBtn.addEventListener("click", takeDate);
