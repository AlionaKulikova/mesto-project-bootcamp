import { openPopupPicture, getSrcPicture } from "./utils.js";

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
}