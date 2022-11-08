import { openPopupPicture, openPopup, closePopup, getSrcPicture } from "./utils.js";

export function likes(evt) {
  const eventTargetLikeActive = evt.target;
  eventTargetLikeActive.setAttribute("disabled", true);
  const statusLike = eventTargetLikeActive.getAttribute("src");
  if (statusLike === 'e3b9ba5840ebe97bc077.svg') {
    eventTargetLikeActive.setAttribute("src", "35948469632d0421d697.svg");
  } else {
    eventTargetLikeActive.setAttribute("src", "e3b9ba5840ebe97bc077.svg");
  }
}

export function deleteCard(evt) {
  const eventTargetDelete = evt.target;
  const removingAnItem = eventTargetDelete.closest(".element");
  removingAnItem.setAttribute("disabled", true);
  removingAnItem.remove();
}

export function createCard(e) {
  const container = document.querySelector(".elements");
  const elementTemplate = document.querySelector("#card-template").content;
  const elementCopy = elementTemplate.querySelector(".element").cloneNode(true);
  container.prepend(elementCopy);
  const card = container;
  card.querySelector(".like").setAttribute("src", "e3b9ba5840ebe97bc077.svg");
  card.querySelector(".element__vector").addEventListener("click", likes, true);
  card.querySelector(".element__delete").addEventListener("click", deleteCard, true);
  card.querySelector(".element__picture").addEventListener("click", openPopupPicture, true);
}

export function createArrayCards() {
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  initialCards.forEach(function (item) {
    createCard();
    const standartCard = item;
    const imageName = standartCard.name;
    const imageSrc = standartCard.link;
    const titleOneNew = (document.querySelector(".element__title").textContent = imageName);
    const linkCardNew = document.querySelector(".element__image-element").setAttribute("src", imageSrc);
    const linkCardAlt = document.querySelector(".element__image-element").setAttribute("alt", imageName);
  });
}

export function createNewCard() {
  const popupNewMesto = document.querySelector("#new-mesto");
  const nameImageEdit = document.querySelector("#nameImage");
  const addLinkEdit = document.querySelector("#addLink");
  const addButton = document.querySelector(".add-button").addEventListener("click", () => openPopup(popupNewMesto));
  const elementTitle = document.querySelector(".element__title");
  const linkCard = document.querySelector(".element__image-element");
  nameImageEdit.setAttribute("value", "Название");
  addLinkEdit.setAttribute("value", "Ссылка на картинку");
  const submitCreate = document.querySelector(".form-new").addEventListener("click", function (evt) {
    if (evt.target.classList.contains("form__submit-button")) {
      const valueImageName = document.getElementById("nameImage").value;
      const valueImageSrc = document.getElementById("addLink").value;
      createCardnew();
      function createCardnew(e) {
        createCard();
        const titleOneNew = (document.querySelector(".element__title").textContent = valueImageName);
        const linkCardNew = document.querySelector(".element__image-element").setAttribute("src", valueImageSrc);
        const linkCardAlt = document.querySelector(".element__image-element").setAttribute("alt", valueImageName);
        document.querySelector("#nameImage").value = "";
        document.querySelector("#addLink").value = "";
        closePopup(popupNewMesto);
        const buttonCreate = document.querySelector("#create");
        buttonCreate.setAttribute("disabled", true);
        buttonCreate.classList.add("form__submit-button_color_noactive");
      }
    }
  });
}
 