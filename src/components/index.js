import "../pages/index.css";

import { openPopup, closePopup } from "./modal.js";
import { likes, deleteCard, createCard } from "./card.js";
import { enableValidation, enableValidationNew, enableValidationPhoto, validateUsername, validateJob, validateNameCard, validateLink, validateLinkPhoto } from "./validate.js";
import { getSrcPicture } from "./utils.js";
import { getMyUser, getAllCards, deleteMyCard, postCard, patchUserData, editPhotoProfil } from "./api.js";

const popupProfile = document.querySelector("#profile-edit");
const editProfile = document.querySelector(".profile__edit-button");

const popupProfilePhoto = document.querySelector("#editPhoto");
const editProfilePhotoOpen = document.querySelector(".profile__avatar");

const closeButtons = document.querySelectorAll(".popup__close");
const submitSave = document.querySelector(".form");
const submitCreate = document.querySelector(".form-new");
const picture = document.querySelector(".picture__images");
const photoProfile = document.querySelector(".form-photo");

const popupNewMesto = document.querySelector("#new-mesto");

const profileName = document.querySelector("#profileName");
const profileOccupation = document.querySelector("#profileOccupation");
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const textButtonSaveProfile = document.querySelector("#save");

const editProfilePhoto = document.querySelector(".profile__avatar-img");
const profileLinkInput = document.querySelector("#profileAddLink");
const submitSavePhoto = document.querySelector(".form-photo");
const textButtonSavePhoto = document.querySelector("#edit");

const popupPicture = document.querySelector("#picture");

const nameImageEdit = document.querySelector("#nameImage");
const addLinkEdit = document.querySelector("#addLink");
const addButton = document.querySelector(".add-button");
const elementTitle = document.querySelector(".element__title");
const linkCard = document.querySelector(".element__image-element");
const textButtonCreateCard = document.querySelector("#create");

editProfile.addEventListener("click", () => openPopup(popupProfile));

editProfilePhotoOpen.addEventListener("click", () => openPopup(popupProfilePhoto));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", function (e) {
    if (!submitSave.contains(e.target) && !submitCreate.contains(e.target) && !picture.contains(e.target) && !photoProfile.contains(e.target)) {
      closePopup(popup);
    }
  });
});

nameInput.setAttribute("value", profileName.innerText);
jobInput.setAttribute("value", profileOccupation.innerText);
submitSave.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("form__submit-button")) {
      const enlargingName = nameInput.value;
      const enlargingJob = jobInput.value;
    textButtonSaveProfile.textContent = "Сохранение...";
    const userData = patchUserData(enlargingName, enlargingJob);
    userData
      .then((result) => {    
        closePopup(popupProfile);
        profileName.textContent = enlargingName;
        profileOccupation.textContent = enlargingJob;
        textButtonSaveProfile.setAttribute("disabled", true);
        textButtonSaveProfile.classList.add("form__submit-button_color_noactive");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        textButtonSaveProfile.textContent = "Сохранить";
      });
  }
});

submitSavePhoto.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("form__submit-button")) {
    const valueImageSrcPhoto = document.getElementById("profileAddLink").value;    
    textButtonSavePhoto.textContent = "Сохранение...";
    const photoProfile = editPhotoProfil(valueImageSrcPhoto);
    photoProfile
      .then((result) => {
        closePopup(popupProfilePhoto);
        editProfilePhoto.setAttribute("src", valueImageSrcPhoto);
        textButtonSavePhoto.setAttribute("disabled", true);
        textButtonSavePhoto.classList.add("form__submit-button_color_noactive");
        document.querySelector("#profileAddLink").value = " ";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        textButtonSavePhoto.textContent = "Сохранить";
      });
  }
});

const MyUser = getMyUser();
const AllCards = getAllCards();
Promise.all([MyUser, AllCards])
  .then((arr) => {
    const idCardUser = arr[0];
    const myProfile = idCardUser;
    const idCardDel = myProfile._id;
    const photoUser = idCardUser.avatar;
    const userName = idCardUser.name;
    const userJob = idCardUser.about;
    editProfilePhoto.setAttribute("src", photoUser);
    profileName.textContent = userName;
    profileOccupation.textContent = userJob;
    const initialCards = arr[1];
    initialCards.forEach(function (item) {
      const standartCard = item;
      const card = createCard(standartCard, idCardDel);
    });
  })

  .catch((err) => {
    console.log(err);
  });

addButton.addEventListener("click", () => openPopup(popupNewMesto));

submitCreate.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("form__submit-button")) {
    const valueImageName = document.getElementById("nameImage").value;
    const valueImageSrc = document.getElementById("addLink").value;
    textButtonCreateCard.textContent = "Создание...";

    const postCards = postCard(valueImageName, valueImageSrc);

    postCards
      .then((result) => {
        const targetCardProfile = result.owner;
        const idCardDel = targetCardProfile._id;
        const cardNew = createCard(result, idCardDel);
        closePopup(popupNewMesto);
        textButtonCreateCard.setAttribute("disabled", true);
        textButtonCreateCard.classList.add("form__submit-button_color_noactive");
        document.querySelector("#nameImage").value = "";
        document.querySelector("#addLink").value = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        textButtonCreateCard.textContent = "Создать";
      });
  }
});

enableValidation(document.querySelector("#form"), {
  name: validateUsername,
  job: validateJob,
});

enableValidationNew(document.querySelector("#form-new"), {
  nameImage: validateNameCard,
  addLink: validateLink,
});

enableValidationPhoto(document.querySelector("#form-photo"), {
  addLinkPhoto: validateLinkPhoto,
});