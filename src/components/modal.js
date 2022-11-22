import { openPopupPicture, openPopup, closePopup, getSrcPicture } from "./utils.js";
export function createProfile(evt) {
  const popupProfile = document.querySelector("#profile-edit");
  const profileName = document.querySelector("#profileName");
  const profileOccupation = document.querySelector("#profileOccupation");
  const nameInput = document.querySelector("#nameInput");
  const jobInput = document.querySelector("#jobInput");
  const submitSave = document.querySelector(".form");
  const textButtonSaveProfile = document.querySelector("#save");
  nameInput.setAttribute("value", profileName.innerText);
  jobInput.setAttribute("value", profileOccupation.innerText);
  submitSave.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("form__submit-button")) {
      const enlargingName = document.getElementById("nameInput").value;
      const enlargingJob = document.getElementById("jobInput").value;
      profileName.textContent = enlargingName;
      profileOccupation.textContent = enlargingJob;
      textButtonSaveProfile.textContent = "Сохранение...";
      fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-2/users/me ", {
        method: "PATCH",
        headers: {
          authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enlargingName,
          about: enlargingJob,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
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
    const photoProfile = document.querySelector(".form-photo");
    popup.addEventListener("click", function (e) {
      if (!container.contains(e.target) && !containerNew.contains(e.target) && !picture.contains(e.target) && !photoProfile.contains(e.target)) {
        closePopup(popup);
      }
    });
  });
}
export function openEditProfile() {
  const popupProfile = document.querySelector("#profile-edit");
  const editProfile = document.querySelector(".profile__edit-button").addEventListener("click", () => openPopup(popupProfile));
}
export function openPhotoProfile() {
  const popupProfilePhoto = document.querySelector("#editPhoto");
  const editProfilePhoto = document.querySelector(".profile__avatar").addEventListener("click", () => openPopup(popupProfilePhoto));
}
export function createPhotoProfile(evt) {
  const popupProfilePhoto = document.querySelector("#editPhoto");
  const editProfilePhoto = document.querySelector(".profile__avatar-img");
  const profileLinkInput = document.querySelector("#profileAddLink");
  const submitSavePhoto = document.querySelector(".form-photo");
  const textButtonSavePhoto = document.querySelector("#edit");
  submitSavePhoto.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("form__submit-button")) {
      const valueImageSrcPhoto = document.getElementById("profileAddLink").value;
      editProfilePhoto.setAttribute("src", valueImageSrcPhoto);
      textButtonSavePhoto.textContent = "Сохранение...";
      fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-2/users/me/", {
        method: "PATCH",
        headers: {
          authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: "valueImageSrcPhoto",
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-2/users/me", {
        headers: {
          authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      closePopup(popupProfilePhoto);
      document.querySelector("#profileAddLink").value = " ";
    }
  });
}