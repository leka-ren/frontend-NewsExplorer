//класс отвечает за сбор информации из полец инпут, вся остальная логика вынесена в отдельный класс
export default class FormData {
  constructor(input, getAuth) {
    this.input = input;
    this._getInfo = this._getInfo.bind(this);
    this._getInfo(getAuth);
  }

  //приватный метод который принимает функцию, в котороую мы передаем собарнный объект функция отправляет запрос на сервер
  _getInfo(getAuth) {
    const date = {};
    let i = 0;
    while (this.input[i]) {
      date[this.input[i].name] = this.input[i].value;
      i++;
    }
    getAuth(date);
  }
}
