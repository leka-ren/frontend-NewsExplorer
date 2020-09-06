export default class InfoArticles {
    constructor(userCount, theme, articles) {
        this.articles = articles;
        this.length = articles.length;
        this.userCount = userCount;
        this.theme = theme;
        this.getCount = this.getCount.bind(this);
        this.getTheme = this.getTheme.bind(this);
        this._sortTheme = this._sortTheme.bind(this);
    }

    _sortTheme() {
        let keyword = this.articles.map((el) => el.keyword);
    }

    getTheme() {
        this.theme = '';
    }
    
    getCount() {
        this.userCount.textContent = `${localStorage.getItem('username')}, у вас ${this.length} сохранённых статей`;
    }
}