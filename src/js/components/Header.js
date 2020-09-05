import Render from "./Render";

export default class Header extends Render {
  constructor(el) {
    super();
    this.el = el;
    this.navList = this.el.querySelector("#ul-links");
    this.btn = this.el.querySelector("#auth-btn");
    this.btnText = this.btn.querySelector("#auth-btn-text");
    this.btnIcon = this.btn.querySelector("#auth-btn-icon");
    this.getAuthContent = this.getAuthContent.bind(this);
    this.getArticlesLink = this.getArticlesLink.bind(this);
    this.logout = this.logout.bind(this);
  }

  getArticlesLink() {
      const liArticles = '<li id="save-articles" class="header__link"><a class="header__page-link" href="./article.html">Сохранённые статьи</a></li>';
      this.childEl = liArticles;
      this.parentEl = this.navList;
      this.renderBeforeend();
  }

  getAuthContent() {
    this.btnIcon.style = "display: flex";
    this.btnText.textContent = localStorage.getItem("username");
    this.getArticlesLink();
  }

  logout() {
      this.btnText.textContent = "Авторизоваться";
      const saveArticlesLink = this.el.querySelector("#save-articles");
      this.btnIcon.style = "display: none";
      saveArticlesLink.remove();
      localStorage.clear();
  }
}
