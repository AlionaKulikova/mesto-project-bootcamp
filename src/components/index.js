import "../pages/index.css";

import { openPopup, closePopup } from "./utils.js";
import { likes, deleteCard, createCard, getSrcPicture } from "./card.js";
import { enableValidation } from "./validate.js";
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
const textButtonCreateCard = document.querySelector("#create");

function disableButton(submitButton) {
  submitButton.setAttribute("disabled", true);
  submitButton.classList.add("form__submit-button_color_noactive");
}

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
submitSave.addEventListener("submit", function (evt) {
  const enlargingName = nameInput.value;
  const enlargingJob = jobInput.value;
  textButtonSaveProfile.textContent = "Сохранение...";
  const userData = patchUserData(enlargingName, enlargingJob);
  userData
    .then((result) => {
      closePopup(popupProfile);
      profileName.textContent = enlargingName;
      profileOccupation.textContent = enlargingJob;
      disableButton(textButtonSaveProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      textButtonSaveProfile.textContent = "Сохранить";
    });
});

submitSavePhoto.addEventListener("submit", function (evt) {
  const valueImageSrcPhoto = profileLinkInput.value;
  textButtonSavePhoto.textContent = "Сохранение...";
  const photoProfile = editPhotoProfil(valueImageSrcPhoto);
  photoProfile
    .then((result) => {
      closePopup(popupProfilePhoto);
      editProfilePhoto.setAttribute("src", valueImageSrcPhoto);
      disableButton(textButtonSavePhoto);
      profileLinkInput.value = " ";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      textButtonSavePhoto.textContent = "Сохранить";
    });
});

const myUser = getMyUser();
const allCards = getAllCards();
Promise.all([myUser, allCards])
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

submitCreate.addEventListener("submit", function (evt) {
  const valueImageName = nameImageEdit.value;
  const valueImageSrc = addLinkEdit.value;
  textButtonCreateCard.textContent = "Создание...";

  const postCards = postCard(valueImageName, valueImageSrc);

  postCards
    .then((result) => {
      const targetCardProfile = result.owner;
      const idCardDel = targetCardProfile._id;
      const cardNew = createCard(result, idCardDel);
      closePopup(popupNewMesto);
      disableButton(textButtonCreateCard);
      nameImageEdit.value = "";
      addLinkEdit.value = "";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      textButtonCreateCard.textContent = "Создать";
    });
});

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".form__submit-button",
  inputErrorClass: "form__field_type_error",
  errorClass: "form__field-error_active",
  inactiveButtonClass: "form__submit-button_color_noactive",
});