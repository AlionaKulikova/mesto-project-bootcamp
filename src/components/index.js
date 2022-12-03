import "../pages/index.css";

import { openPopup, closePopup } from "./modal.js";
import { likes, deleteCard, createCard, createCardNew } from "./card.js";
import { enableValidation, enableValidationNew, enableValidationPhoto, validateUsername, validateJob, validateNameCard, validateLink, validateLinkPhoto } from "./validate.js";
import { getSrcPicture } from "./utils.js";
import { getMyUser, getAllCards, deleteMyCard, postCard, patchUserData, editPhotoProfil } from "./api.js";

const popupProfile = document.querySelector("#profile-edit");
const editProfile = document.querySelector(".profile__edit-button");

const popupProfilePhoto = document.querySelector("#editPhoto");
const editProfilePhotoOpen = document.querySelector(".profile__avatar");

const closeButton = document.querySelectorAll(".popup__close");
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

closeButton.forEach((evt) => {
  const popup = evt.closest(".popup");
  evt.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", function (e) {
    if (!submitSave.contains(e.target) && !submitCreate.contains(e.target) && !picture.contains(e.target) && !photoProfile.contains(e.target)) {
      closePopup(popup);
    }
  });
});


textButtonSaveProfile.textContent = "Сохранить";
nameInput.setAttribute("value", profileName.innerText);
jobInput.setAttribute("value", profileOccupation.innerText);
submitSave.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("form__submit-button")) {
    const enlargingName = document.getElementById("nameInput").value;
    const enlargingJob = document.getElementById("jobInput").value;
    profileName.textContent = enlargingName;
    profileOccupation.textContent = enlargingJob;
    textButtonSaveProfile.textContent = "Сохранение...";
    const userData = patchUserData(enlargingName, enlargingJob);
    userData
      .then((result) => {
        console.log(result);
        const myUse = getMyUser();
        myUse
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
        closePopup(popupProfile);
        textButtonSaveProfile.setAttribute("disabled", true);
        textButtonSaveProfile.classList.add("form__submit-button_color_noactive");
        textButtonSaveProfile.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

submitSavePhoto.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("form__submit-button")) {
    const valueImageSrcPhoto = document.getElementById("profileAddLink").value;
    editProfilePhoto.setAttribute("src", valueImageSrcPhoto);
    textButtonSavePhoto.textContent = "Сохранение...";
    const photoProfile = editPhotoProfil(valueImageSrcPhoto);
    photoProfile
      .then((result) => {
        console.log(result);
        const myUserP = getMyUser();
        myUserP
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
        closePopup(popupProfilePhoto);
        textButtonSavePhoto.setAttribute("disabled", true);
        textButtonSavePhoto.classList.add("form__submit-button_color_noactive");
        textButtonSavePhoto.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });
    document.querySelector("#profileAddLink").value = " ";
  }
});

const MyUser = getMyUser();
const AllCards = getAllCards();
Promise.all([MyUser, AllCards])
  .then((arr) => {
    const idCardUser = arr[0];
    const myProfile = idCardUser;
    const idCardDel = myProfile._id;
    const initialCards = arr[1];
    initialCards.forEach(function (item) {
      const standartCard = item;
      const card = createCard(standartCard, idCardDel);
      card.querySelector(".element__delete").addEventListener("click", deleteCard, true);
      card.querySelector(".element__picture").addEventListener("click", function (evt) {
        openPopup(popupPicture);
      });
      const valPictureSrc = document.querySelectorAll(".element__image-element").forEach(function (evt) {
        evt.addEventListener("click", getSrcPicture, true);
      });
      card.querySelector(".element__vector").addEventListener("click", likes, true);
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
    const card = createCardNew(valueImageName, valueImageSrc);
    textButtonCreateCard.textContent = "Создание...";
    card.querySelector(".element__picture").addEventListener("click", function (evt) {
      const popupPicture = document.querySelector("#picture");
      openPopup(popupPicture);
    });
    const valPictureSrc = document.querySelectorAll(".element__image-element").forEach(function (evt) {
      evt.addEventListener("click", getSrcPicture, true);
    });

    const postCards = postCard(valueImageName, valueImageSrc);
    postCards
      .then((result) => {
        console.log(result);
        const getCardsNew = getAllCards();
        getCardsNew
          .then((result) => {
            console.log(result);
            const initialCards = result;
            initialCards.forEach(function (item) {
              const standartCard = item;
              const name = standartCard.name;
              const link = standartCard.link;
              if (name === valueImageName && link === valueImageSrc) {
                const idCard = standartCard._id;
                const sumlikes = standartCard.likes;
                const likeLong = sumlikes.length;
                const likesCard = (document.querySelector(".element__likes").textContent = likeLong);
                const countLike = document.querySelector(".element__likes").setAttribute("id", idCard);
                const targetCardProfile = standartCard.owner;
                const idTargetCardProfile = targetCardProfile._id;
                card.querySelector(".delete").setAttribute("id", idCard);
                card.querySelector(".element__delete").addEventListener("click", deleteCard, true);
                card.querySelector(".like").setAttribute("id", idCard);
                card.querySelector(".element__vector").addEventListener("click", likes, true);
              }
            });
            card.querySelector(".element__vector").addEventListener("click", likes, true);
            card.querySelector(".element__delete").addEventListener("click", deleteCard, true);
            document.querySelector("#nameImage").value = "";
            document.querySelector("#addLink").value = "";
          })
          .catch((err) => {
            console.log(err);
          });
        closePopup(popupNewMesto);
        textButtonCreateCard.setAttribute("disabled", true);
        textButtonCreateCard.classList.add("form__submit-button_color_noactive");
        textButtonCreateCard.textContent = "Создать";
      })
      .catch((err) => {
        console.log(err);
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