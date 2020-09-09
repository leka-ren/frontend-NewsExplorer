export default class MainApi {
  constructor() {
    this.url = "www.api.newsexpo.ml";
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  signup({ name, email, password }) {
    return fetch(`https://${this.url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => {
      return res;
    });
  }

  signin({ email, password }) {
    return fetch(`https://${this.url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      return res;
    });
  }

  getUserData() {
    return fetch(`https://${this.url}/users/me`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
    });
  }
  getArticles() {
    return fetch(`https://${this.url}/articles`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
    });
  }
  createArticle(saveData) {
    return fetch(`https://${this.url}/articles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: saveData.keyword,
        title: saveData.title,
        text: saveData.text,
        date: saveData.date,
        source: saveData.source,
        link: saveData.link,
        image: saveData.image,
      }),
    }).then((res) => {
      return Promise.resolve(res.json());
    });
  }
  removeArticle(atricleId) {
    return fetch(`https://${this.url}/articles/${atricleId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      return res;
    });
  }
}
