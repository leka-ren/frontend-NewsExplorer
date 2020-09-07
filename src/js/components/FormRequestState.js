export default class FormRequestState {
  constructor(form) {
    this.form = form;
  }

  deactiveState() {
    this.form.forEach((el) => {
      el.tagName === "INPUT"
        ? el.setAttribute("readonly", "")
        : (el.disabled = true);
    });
  }
  activeState() {
    this.form.forEach((el) => {
      el.tagName === "INPUT"
        ? el.removeAttribute("readonly")
        : (el.disabled = false);
    });
  }
}
