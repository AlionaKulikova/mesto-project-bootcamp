const initialCards = [
  {
    id: "card1new",
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    id: "card2new",
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    id: "card3new",
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    id: "card4new",
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    id: "card5new",
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    id: "card6new",
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardOne = document.querySelector("#card1").setAttribute("src", initialCards[0].link);
const cardTwo = document.querySelector("#card2").setAttribute("src", initialCards[1].link);
const cardThree = document.querySelector("#card3").setAttribute("src", initialCards[2].link);
const cardFour = document.querySelector("#card4").setAttribute("src", initialCards[3].link);
const cardFive = document.querySelector("#card5").setAttribute("src", initialCards[4].link);
const cardSix = document.querySelector("#card6").setAttribute("src", initialCards[5].link);

const titleOne = (document.querySelector("#title1").textContent = initialCards[0].name);
const titleTwo = (document.querySelector("#title2").textContent = initialCards[1].name);
const titleThree = (document.querySelector("#title3").textContent = initialCards[2].name);
const titleFour = (document.querySelector("#title4").textContent = initialCards[3].name);
const titleFive = (document.querySelector("#title5").textContent = initialCards[4].name);
const titleSix = (document.querySelector("#title6").textContent = initialCards[5].name);

const popupProfile = document.querySelector("#profile-edit");
const editProfile = document.querySelector(".profile__edit-button").addEventListener("click", popupOpen, true);
const popupClose = document.querySelector("#profile-close").addEventListener("click", closePopup, true);

function popupOpen(e) {
  popupProfile.classList.add("popup_opened");
}

function closePopup(e) {
  popupProfile.classList.remove("popup_opened");
}

const profileName = document.querySelector("#profileName");
const profileOccupation = document.querySelector("#profileOccupation");
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const submitSave = document.querySelector("#save");

nameInput.setAttribute("value", profileName.innerText);
jobInput.setAttribute("value", profileOccupation.innerText);

submitSave.addEventListener("click", function () {
  enlargingName = document.getElementById("nameInput").value;
  enlargingJob = document.getElementById("jobInput").value;
  profileName.textContent = enlargingName;
  profileOccupation.textContent = enlargingJob;
  popupProfile.classList.remove("popup_opened");
});

const popupNewMesto = document.querySelector("#new-mesto");
const nameImageEdit = document.querySelector("#nameImage");
const addLinkEdit = document.querySelector("#addLink");

nameImageEdit.setAttribute("value", "Название");
addLinkEdit.setAttribute("value", "Ссылка на картинку");

const addButton = document.querySelector(".add-button").addEventListener("click", popupOpenNew, true);
const popupCloseNew = document.querySelector("#new-close").addEventListener("click", closePopupNew, true);

function popupOpenNew(e) {
  popupNewMesto.classList.add("popup_opened");
}

function closePopupNew(e) {
  popupNewMesto.classList.remove("popup_opened");
}

const elementTitle = document.querySelector(".element__title");
const linkCard = document.querySelector(".element__image-element");
const submitCreate = document.querySelector("#create").addEventListener("click", createCard, true);

function createCard(e) {
  const container = document.querySelector(".elements");
  const elementTemplate = document.querySelector("#card-template").content;
  const elementCopy = elementTemplate.querySelector(".element").cloneNode(true);
  container.prepend(elementCopy);

  const card = container;
  card.querySelector(".like").setAttribute("src", "images/Group.svg");
  card.querySelector(".element__vector").addEventListener("click", likes, true);
  card.querySelector(".element__delete").addEventListener("click", deleteCard, true);

  valueImageName = document.getElementById("nameImage").value;
  valueImageSrc = document.getElementById("addLink").value;

  const titleOneNew = (document.querySelector(".element__title").textContent = valueImageName);
  const linkCardNew = document.querySelector(".element__image-element").setAttribute("src", valueImageSrc);
  const linkCardAlt = document.querySelector(".element__image-element").setAttribute("alt", valueImageName);

  card.querySelector(".element__picture").addEventListener("click", popupOpenPicture, true);

  popupNewMesto.classList.remove("popup_opened");
}

const elementLike = document.querySelectorAll(".element__vector").forEach(function (evt) {
  evt.addEventListener("click", likes, true);
});

function likes(evt) {
  const eventTargetLike = evt.target;
  eventTargetLike.addEventListener("click", setupLike, true);

  function setupLike(evt) {
    const eventTargetLikeActive = evt.target;
    eventTargetLikeActive.setAttribute("disabled", true);
    eventTargetLikeActive.setAttribute("src", "images/Union.svg");
  }
}

const deleteButton = document.querySelectorAll(".element__delete").forEach(function (evt) {
  evt.addEventListener("click", deleteCard, true);
});

function deleteCard(e) {
  const eventTargetDelete = e.target;
  eventTargetDelete.addEventListener("click", toDelete, true);

  function toDelete(evt) {
    const removingAnItem = eventTargetDelete.closest(".element");
    removingAnItem.setAttribute("disabled", true);
    removingAnItem.remove();
  }
}

const miniPicture = document.querySelectorAll(".element__picture").forEach(function (evt) {
  evt.addEventListener("click", popupOpenPicture, true);
});

function popupOpenPicture(evt) {
  const popupPicture = document.querySelector("#picture");
  popupPicture.classList.add("popup_opened");
  const popupClosePicture = document.querySelectorAll("#picture-close").forEach(function (evt) {
    evt.addEventListener("click", closePopupPicture, true);
  });

  function closePopupPicture(evt) {
    const popupPictureClose = document.querySelector("#picture");
    popupPictureClose.classList.remove("popup_opened");
  }

  const valPictureSrc = document.querySelectorAll(".element__image-element").forEach(function (evt) {
    evt.addEventListener("click", srcGetPicture, true);
  });

  function srcGetPicture(evt) {
    const evtTargetPicture = evt.target;
    const valSrc = evtTargetPicture.getAttribute("src");
    const valCaption = evtTargetPicture.getAttribute("alt");
    const maxPicture = document.querySelector(".picture__images").setAttribute("src", valSrc);
    const pictureCaption = (document.querySelector(".picture__caption").textContent = valCaption);
  }
}