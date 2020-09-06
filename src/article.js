import "./pages/article.css";
import MainApi from "./js/api/MainApi";
import InfoArticles from "./js/components/InfoArticles";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";

const nameUser = localStorage.getItem("username");
const btnContent = document.querySelector("#user-name");
const iconLogout = document.querySelector("#logout-icon");
const cardConteainer = document.querySelector("#cards-list-art");
const userInformCount = document.querySelector("#user-count");
const theme = document.querySelector("#theme");
const cardsContainer = document.querySelector("#cards-container");

const apiCards = new MainApi();
const newsCardList = new NewsCardList(cardsContainer);

btnContent.textContent = nameUser;
iconLogout.style.display = "flex";
cardConteainer.style.display = "flex";

const articles = apiCards.getArticles();

function renderArticles(articles) {
  let articlesList = [];
  for (let el of articles) {
    const createdArticles = new NewsCard(el, "", apiCards, "trash");
    articlesList.push(createdArticles);
  }
  newsCardList.renderResults(articlesList);
}

articles
  .then((res) => {
    renderArticles(res.data);
    const infoArticles = new InfoArticles(userInformCount, theme, res.data);
  })
  .catch((err) => console.log(err));

function clearStore() {
  localStorage.clear();
  window.location.href = "index.html";
}

btnContent.addEventListener("click", clearStore);
