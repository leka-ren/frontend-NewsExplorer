export default class NewsApi {
  constructor() {
    this.keyNews = "3c8cb94dcadc465eb0883407f8c02fe7";
    // this.url = "http://newsapi.org";
    this.url = "https://nomoreparties.co/news";
    this.getNews = this.getNews.bind(this);
  }
  getNews(keyWord, dateMin, dateMax) {
    return fetch(
      `${this.url}/v2/everything?q=${keyWord}}&from=${dateMin}&to=${dateMax}&sortBy=date&apiKey=${this.keyNews}`
    ).then((res) => Promise.resolve(res.json()))
  }
}