export default class NewsApi {
  constructor() {
    this.keyNews = "3c8cb94dcadc465eb0883407f8c02fe7";
    this.url = "newsapi.org";
    // this.url = "nomoreparties.co/news";
    this.getNews = this.getNews.bind(this);
  }
  getNews(keyWord, dateMin, dateMax) {
    dateMin = "2020-08-27";
    dateMax = "2020-09-02";
    keyWord = "Природа";
    return fetch(
      `http://${this.url}/v2/everything?q=${keyWord}}&from=${dateMin}&to=${dateMax}&sortBy=date&apiKey=${this.keyNews}`
    ).then((res) => console.log(res.json()));
  }
}