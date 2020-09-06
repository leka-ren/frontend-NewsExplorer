import "./pages/index.css";
import PopupShow from "./js/components/PopupShow";
import Popup from "./js/components/Popup";
import FormValidation from "./js/FormValidator";
import FormData from "./js/components/FormData";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import Header from "./js/components/Header";
import NewsCard from "./js/components/NewsCard";

const popup = document.querySelector(".popup");
const form = popup.querySelector("#form");
const authText = popup.querySelector("#authorization-text");
const header = document.querySelector("#header");

const authBtn = document.querySelector("#auth-btn");
const formBtn = form.querySelector("button");
const signBtn = popup.querySelector("#sign-btn");
const burgerBtn = document.querySelector("#burger-btn");

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const showMoreBtn = document.querySelector("#show-more");
const cardsContainer = document.querySelector("#cards-list");

const preloader = document.querySelector(".resoult__preloader");
const resoultArticlesBlock = document.querySelector(".resoult__good");
const resoultEmpty = document.querySelector(".resoult__false");

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
const newsCardMaker = new NewsCard(cardsContainer);

/// переменные для отрисовки по кнопке showMore
let newsList = [];
let i = 0;
///

function authBtnEvent(event) {
  if (event.target.textContent === "Авторизоваться") popupShow.open();
  if (event.target.textContent === localStorage.getItem("username")) {
    headerClass.logout();
  }
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
    const answer = await auth.signup(date);
    if (answer.status === 200) {
      //form.remove();
      console.log("kek");
    }
    if (answer.status === 409) {
      authText.textContent = "Пользователь с таким email уже есть";
    }
  } else {
    alert("Error!");
  }
}

const today = new Date();
const weekBefore = new Date();
weekBefore.setDate(today.getDate() - 7);

function formatDate(date) {
  return `${date.getFullYear()}-${leftPad(date.getMonth() + 1)}-${leftPad(
    date.getDate()
  )}`;
}

function leftPad(num) {
  return num >= 9 ? num : `0${num}`;
}

function takeData(event) {
  event.preventDefault();
  const input = form.querySelectorAll("input");
  const formClass = new FormData(input, getAuth);
}

function clearCardList() {
  document.querySelectorAll(".resoult__card").forEach((el) => el.remove());
  newsList = [];
}

function requestNews() {
  i = 0;
  if (cardsContainer.children.length !== 0) {
    clearCardList();
  }
  preloader.style.display = "flex";
  resoultArticlesBlock.style.display = "none";
  news
    .getNews(searchInput.value, formatDate(today), formatDate(weekBefore))
    .then((res) => {
      preloader.style.display = "none";
      if (res.articles.length > 0) {
        resoultArticlesBlock.style.display = "flex";
        if (resoultEmpty.style.display === "flex") {
          resoultEmpty.style.display = "none";
        }
        showArticle(res.articles);
      } else if (res.articles.length === 0) {
        resoultEmpty.style.display = "flex";
      }
    });
}

function showArticle(news) {
  if (newsList.length === 0) {
    newsList = news;
  }
  let count = i + 3;
  if (i > 0) {
    i += 1;
    count += 1;
  }
  for (i; i < count && i <= newsList.length - 1; i++) {
    newsCardMaker.createCard(newsList[i]);
  }
}

const burgerMenu = document.querySelector(".header__burger-param");

function burgerShow() {
  console.log("click");
  burgerMenu.style.display = "flex";

}

authBtn.addEventListener("click", authBtnEvent);
signBtn.addEventListener("click", signBtnEvent);
formValidate.setEventListeners();
formBtn.addEventListener("click", takeData);
searchBtn.addEventListener("click", requestNews);
showMoreBtn.addEventListener("click", showArticle);
burgerBtn.addEventListener("click", burgerShow);
