export default class InfoArticles {
    constructor(userCount, theme, articles) {
        this.articles = articles;
        this.length = articles.length;
        this.userCount = userCount;
        this.theme = theme;
        this._getCount();
        this._getTheme();
        this._sortTheme = this._sortTheme.bind(this);
    }

    _sortTheme() {
        let keyword = this.articles.map((el) => el.keyword);
        keyword = Array.from(new Set(keyword));
        return keyword.join(', ');
    }

    _getTheme() {
        this.theme.textContent = this._sortTheme();
    }
    
    _getCount() {
        this.userCount.textContent = `${localStorage.getItem('username')}, у вас ${this.length} сохранённых статей`;
    }
}