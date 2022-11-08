import { openPopupPicture, openPopup, closePopup, getSrcPicture } from "./utils.js";

export function createProfile(evt) {
  const popupProfile = document.querySelector("#profile-edit");
  const profileName = document.querySelector("#profileName");
  const profileOccupation = document.querySelector("#profileOccupation");
  const nameInput = document.querySelector("#nameInput");
  const jobInput = document.querySelector("#jobInput");
  const submitSave = document.querySelector(".form");
  nameInput.setAttribute("value", profileName.innerText);
  jobInput.setAttribute("value", profileOccupation.innerText);
  submitSave.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("form__submit-button")) {
      const enlargingName = document.getElementById("nameInput").value;
      const enlargingJob = document.getElementById("jobInput").value;
      profileName.textContent = enlargingName;
      profileOccupation.textContent = enlargingJob;
      closePopup(popupProfile);
      document.querySelector("#nameInput").value = "Жак-Ив-Кусто";
      document.querySelector("#jobInput").value = "Исследователь океана";
    }
  });
}

export function openModalWindow() {
  const popupNewMesto = document.querySelector("#new-mesto");
  document.addEventListener("keydown", function (evt) {
    if (evt.keyCode == 13) {
      openPopup(popupNewMesto);
    }
  });
}

export function closeModalWindow() {
  const closeButton = document.querySelectorAll(".popup__close");
  closeButton.forEach((evt) => {
    const popup = evt.closest(".popup");
    evt.addEventListener("click", () => closePopup(popup));
    document.addEventListener("keydown", function (e) {
      if (e.keyCode == 27) {
        closePopup(popup);
      }
    });

    const container = document.querySelector(".form");
    const containerNew = document.querySelector(".form-new");
    const picture = document.querySelector(".picture__images");
    popup.addEventListener("click", function (e) {
      if (!container.contains(e.target) && !containerNew.contains(e.target) && !picture.contains(e.target)) {
        closePopup(popup);
      }
    });
  });
}

export function openEditProfile() {
  const popupProfile = document.querySelector("#profile-edit");
  const editProfile = document.querySelector(".profile__edit-button").addEventListener("click", () => openPopup(popupProfile));
}