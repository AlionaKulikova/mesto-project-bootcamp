import '../pages/index.css';
import { createProfile, openModalWindow, closeModalWindow, openEditProfile } from "./modal.js";
import { likes, deleteCard, createCard, createArrayCards, createNewCard } from "./card.js";
import { validFormProfile, validFormNewMesto } from "./validate.js";
import { openPopupPicture, openPopup, closePopup, getSrcPicture } from "./utils.js";
createArrayCards();
openEditProfile();
closeModalWindow();
openModalWindow();
createProfile();
createNewCard();
validFormProfile();
validFormNewMesto();