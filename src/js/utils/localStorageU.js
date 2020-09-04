export default class localStorageU {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this._setStorage = this._setStorage.bind(this);
        this._setStorage();
    }

    _setStorage() {
        localStorage.setItem(this.key, this.value);
    }
}