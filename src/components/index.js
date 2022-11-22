import '../pages/index.css';
import { createProfile, openModalWindow, closeModalWindow, openEditProfile, openPhotoProfile, createPhotoProfile } from "./modal.js";
import { likes, deleteCard, createArrayCards, createNewCard } from "./card.js";
import { validFormProfile, validFormNewMesto, validFormProfilePhoto } from "./validate.js";
import { openPopupPicture, openPopup, closePopup, getSrcPicture } from "./utils.js";

createArrayCards();
openEditProfile();
createPhotoProfile();
closeModalWindow();
openModalWindow();
createProfile();
createNewCard();
openPhotoProfile();
validFormProfile();
validFormNewMesto();
validFormProfilePhoto();