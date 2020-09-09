export default class Render {
    constructor() {
        this.parentEl = {};
        this.childEl = "";
    }

    renderBeforeend() {
        this.parentEl.insertAdjacentHTML('beforeend', this.childEl);
    }
    renderAfterBegin() {
        this.parentEl.insertAdjacentHTML('afterBegin', this.childEl);
    }
}