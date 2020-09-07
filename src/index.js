import "./pages/index.css";
import PopupShow from "./js/components/PopupShow";
import Popup from "./js/components/Popup";
import FormValidation from "./js/components/FormValidator";
import FormData from "./js/components/FormData";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import Header from "./js/components/Header";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";
import FormRequestState from "./js/components/FormRequestState";

const body = document.querySelector("body");
const burgerMenu = document.querySelector(".header__burger-param");
const popup = document.querySelector(".popup");
const successful = document.querySelector(".successful");
const popupSubAuth = document.querySelector(".popup__subtitle");
const form = popup.querySelector("#form");
const authText = popup.querySelector("#authorization-text");
const header = document.querySelector("#header");

const authBtn = document.querySelector("#auth-btn");
const formBtn = document.querySelector("#form-btm");
const signBtn = popup.querySelector("#sign-btn");
const burgerBtn = document.querySelector("#burger-btn");

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const showMoreBtn = document.querySelector("#show-more");
const inputError = document.querySelector("#input-error");
const cardsContainer = document.querySelector("#cards-list");

const preloader = document.querySelector(".resoult__preloader");
const resoultArticlesBlock = document.querySelector(".resoult__good");
const resoultEmpty = document.querySelector(".resoult__false");

const validateStringError = {
  validationAbsenceRU: "Обязательное поле",
  validationLenghtRU: "Должно быть от 2 до 30 символов",
  validationMailRU: "Неправильный формат email",
  validatiobSearchInputRU: "Запрос не может быть пустым",
};

const headerClass = new Header(header);
localStorage.getItem("username") ? headerClass.getAuthContent() : 0;

const authApi = new MainApi();
const news = new NewsApi();

const popupShow = new PopupShow(popup);
const formValidate = new FormValidation(form, formBtn, validateStringError);
const nameInput = new Popup(popup);
const articleListRender = new NewsCardList(cardsContainer);
const formState = new FormRequestState(form);

/// переменные для отрисовки по кнопке showMore
let newsList = [];
let i = 0;
///

function authBtnEvent(event) {
  if (event.target.textContent === "Авторизоваться") {
    popupShow.open();
  }
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
  formState.deactiveState();
  if (!date.name) {
    try {
      const answer = await authApi.signin(date);
      if (answer.status === 200) {
        authApi
          .getUserData()
          .then((res) => {
            localStorage.setItem("username", res.data.name);
            popupShow.close();
            headerClass.getAuthContent();
          })
          .catch((e) => (authText.textContent = "С запросом что-то не так"));
      }
      if (answer.status === 401) {
        authText.textContent = "Неверный email или пароль";
      }
    } catch (e) {
      authText.textContent = "С запросом что-то не так";
    }
  } else if (date.name) {
    try {
      const answer = await authApi.signup(date);
      console.log(answer.status);
      if (answer.status === 200) {
        popupShow.close();
        toggleSuccessful();
      }
      if (answer.status === 409) {
        authText.textContent = "Пользователь с таким email уже есть";
      }
      if (answer.status >= 500) {
        authText.textContent = "Что-то с сервером";
      }
    } catch (e) {
      authText.textContent = "С запросом что-то не так";
    }
  }
  formState.activeState();
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
  inputError.textContent = "";
  if (searchInput.value) {
    searchInput.placeholder = "Введите тему новости";
    searchBtn.style.backgroundColor = "#2f71e5";
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
      })
      .catch((e) => {
        preloader.style.display = "none";
        inputError.textContent = "Что-то не так с запросом";
      });
  } else {
    searchInput.placeholder = validateStringError.validatiobSearchInputRU;
    searchBtn.style.backgroundColor = "red";
  }
}

function showArticle(news) {
  const articlesCard = [];
  if (newsList.length === 0) {
    newsList = news;
  }
  let count = i + 3;
  if (i > 0) {
    i += 1;
    count += 1;
  }
  for (i; i < count && i <= newsList.length - 1; i++) {
    const createBaseCard = new NewsCard(
      newsList[i],
      searchInput.value,
      authApi,
      "save"
    ); //значение из инпута, для заполнения keyword
    articlesCard.push(createBaseCard);
  }
  articleListRender.renderResults(articlesCard);
}

function burgerShow() {
  burgerMenu.classList.toggle("active");
  body.classList.toggle("fixed");
  popupShow.close();
}

function toggleSuccessful() {
  successful.classList.toggle("popup_is-opened");
}

function openAuth() {
  popupShow.open();
  toggleSuccessful();
}

authBtn.addEventListener("click", authBtnEvent);
signBtn.addEventListener("click", signBtnEvent);
formValidate.setEventListeners();
formBtn.addEventListener("click", takeData);
searchBtn.addEventListener("click", requestNews);
showMoreBtn.addEventListener("click", showArticle);
burgerBtn.addEventListener("click", burgerShow);
popupSubAuth.addEventListener("click", openAuth);
