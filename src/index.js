import "./pages/index.css";
import PopupShow from "./js/components/PopupShow";
import Popup from "./js/components/Popup";
import FormValidation from "./js/FormValidator";
import Form from "./js/components/Form";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";

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
const news = new NewsApi();

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

//функция которая принимает объект данных, для отправки запрома на авторизацию или регистрацию
function getAuth(date) {
  const auth = new MainApi();
  if (!date.name) {
    const answer = auth.signin(date);
    console.log(answer);
  } else if (date.name) {
      const answer = auth.signup(date);
  } else {
      alert("Error!");
  }
}

function takeDate(event) {
  event.preventDefault();
  const input = form.querySelectorAll("input");
  const formClass = new Form(input, getAuth);
}

authBtn.addEventListener("click", popupOpen);
signBtn.addEventListener("click", signBtnEvent);
formValidate.setEventListeners();
formBtn.addEventListener("click", takeDate);
