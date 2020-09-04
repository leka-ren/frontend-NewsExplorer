import Render from "./Render";

export default class Header extends Render{
    constructor(el) {
        super();
        this.btn = el.querySelector("#auth-btn");
        this.btnText = this.btn.querySelector("#auth-btn-text");
        this.btnIcon = this.btn.querySelector("#auth-btn-icon");
        this.getAuthContent = this.getAuthContent.bind(this);
    }

    getAuthContent() {
        this.btnIcon.style = 'display: flex'
        this.btnText.textContent = localStorage.getItem('username');
        this.parentEl = this.btn;
        this.childEl = activeProfile;
        this.renderBeforeend();
    }
}