export default class MainApi {
  constructor(url) {
    this.url = "www.api.newsexpo.ml";
    // this.url = 'localhost:4242';
    this.token = 1;
  }

  signup() {}
  signin(email, password) {
    return fetch(`https://${this.url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) console.log(res)
        // document.cookie = res.headers.setCookie;
        // Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch((err) =>
        Promise.reject(new Error(`Ошибка соединения: ${err.message}`))
      );
  }
  getUserData() {
    return fetch("https://www.api.newsexpo.ml/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(Promise.resolve(res.json()));
        }
        Promise.reject(new Error(`Ошибка сервера: ${res.status}`));
      })
      .catch((e) => console.log(e));
  }
  getArticles() {}
  createArticle() {}
  removeArticle() {}
}
