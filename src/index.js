import "./pages/index.css";
import PopupShow from "./js/components/PopupShow";
import Popup from "./js/components/Popup";
import FormValidation from "./js/FormValidator";
import Form from "./js/components/Form";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import Header from "./js/components/Header";

const popup = document.querySelector(".popup");
const form = popup.querySelector("#form");
const authText = popup.querySelector("#authorization-text");
const header = document.querySelector("#header");

const authBtn = document.querySelector("#auth-btn");
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
const nameInput = new Popup(popup);
const headerClass = new Header(header);

console.log(nameInput.signBtn);

function popupOpen(event) {
  if (event.target.textContent === "Авторизоваться") popupShow.open();
}

function signBtnEvent(event) {
  if (event.target.textContent === "Зарегистрироваться") {
    popupShow.resetContent();
    nameInput.getRegistredForm();
    nameInput.stateFields("Войти", "Регистрация", "Зарегистрироваться");
  } else if (event.target.textContent === "Войти") {
    popupShow.resetContent();
    nameInput.removeRegForm(document.querySelectorAll("#name"));
    nameInput.stateFields("Зарегистрироваться", "Вход", "Войти");
  }
}

//функция которая принимает объект данных, для отправки запроcа на авторизацию или регистрацию
async function getAuth(date) {
  const auth = new MainApi();
  if (!date.name) {
    const answer = await auth.signin(date);
    console.log(answer);
    if (answer.status === 200) {
      auth.getUserData().then((res) => {
        localStorage.setItem("username", res.data.name);
        popupShow.close();
        headerClass.getAuthContent();
      });
    }
    if (answer.status === 401) {
      authText.textContent = "Неверный email или пароль";
    }
  } else if (date.name) {
    const pinForm = form;
    console.log(pinForm);
    const answer = await auth.signup(date);
    if (answer.status === 200) {
        form.remove();
    }
    if (answer.status === 409) {
      authText.textContent = "Пользователь с таким email уже есть";
    }
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
