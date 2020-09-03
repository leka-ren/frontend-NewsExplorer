export default class MainApi {
  constructor() {
    this.url = "www.api.newsexpo.ml";
  }

  signup(name, email, password) {
    return fetch(`https://${this.url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch((err) =>
        Promise.reject(new Error(`Ошибка соединения: ${err.message}`))
      );
  }
  signin(email, password) {
    return fetch(`https://${this.url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch((err) =>
        Promise.reject(new Error(`Ошибка соединения: ${err.message}`))
      );
  }
  getUserData() {
    return fetch("https://www.api.newsexpo.ml/users/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        Promise.reject(new Error(`Ошибка сервера: ${res.status}`));
      })
      .catch((e) => console.log(e));
  }
  getArticles() {}
  createArticle() {}
  removeArticle() {}
}
