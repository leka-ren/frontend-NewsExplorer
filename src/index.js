import "./pages/index.css";
import PopupShow from "./js/PopupShow";
import FormValidation from "./js/FormValidator";

const authBtn = document.querySelector("#auth-btn");
const popup = document.querySelector(".popup");
const form = popup.querySelector("#form");
const validateStringError = {
    validationAbsenceRU: "Обязательное поле",
    validationLenghtRU: "Должно быть от 2 до 30 символов",
    validationMailRU: "Неправильный формат email",
  };

const popupShow = new PopupShow(popup);

function popupOpen(event) {
    popupShow.open();
}

authBtn.addEventListener("click", popupOpen);
