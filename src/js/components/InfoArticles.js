export default class InfoArticles {
  constructor(userCount, theme, articles) {
    this.articles = articles;
    this.length = articles.length;
    this.userCount = userCount;
    this.theme = theme;
    this._getCount();
    this._getTheme();
    this._uniqTheme = this._uniqTheme.bind(this);
  }

  _sort(inputArray) {
    const frequency = inputArray.reduce((acc, word) => {
      acc[word] ? acc[word]++ : (acc[word] = 1);
      return acc;
    }, {});

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map((arr) => arr[0]);
  }

  _uniqTheme() {
    let keyword = this.articles.map((el) => el.keyword);
    let themeSort = this._sort(keyword);
    keyword = Array.from(new Set(themeSort));
    return keyword;
  }

  _getTheme() {
    const valueTheme = this._uniqTheme();
    if (valueTheme.length <= 3) {
      this.theme.textContent = `${valueTheme.join(", ")}`;
    } else {
      let newValue = valueTheme.slice(0, 2).join(", ");
      this.theme.textContent = `${newValue} и ${valueTheme.length - 2} другим`;
    }
  }

  _getCount() {
    this.userCount.textContent = `${localStorage.getItem("username")}, у вас ${
      this.length
    } сохранённых статей`;
  }
}
