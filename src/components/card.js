import { getMyUser, getAllCards, deleteMyCard, postCard, putLikes, delLikes } from "./api.js";
import { openPopup, closePopup } from "./utils.js";
import likeWhite from "../images/Group.svg";
import likeBlack from "../images/Union.svg";

const maxPicture = document.querySelector(".picture__images");
const pictureCaption = document.querySelector(".picture__caption");
const popupPicture = document.querySelector("#picture");
const container = document.querySelector(".elements");

export function getSrcPicture(evt) {
  const evtTargetPicture = evt.target;
  const valSrc = evtTargetPicture.getAttribute("src");
  const valCaption = evtTargetPicture.getAttribute("alt");
  maxPicture.setAttribute("src", valSrc);
  maxPicture.setAttribute("alt", valCaption);
  pictureCaption.textContent = valCaption;
}

export function likes(evt, like, card) {
  const targetCard = card;
  const eventTargetLikeActive = evt.target;
  eventTargetLikeActive.setAttribute("disabled", true);
  const idLike = like;
  const statusLike = eventTargetLikeActive.getAttribute("src");
  if (statusLike === likeWhite) {
    const putLike = putLikes(idLike);
    putLike
      .then((result) => {
        const standartCard = result;
        const sumlikes = standartCard.likes;
        const name = standartCard.name;
        const likeLong = sumlikes.length;
        const likesCard = targetCard.querySelector(".element__likes");
        likesCard.textContent = likeLong;
        eventTargetLikeActive.setAttribute("src", likeBlack);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const delLike = delLikes(idLike);
    delLike
      .then((result) => {
        const standartCard = result;
        const sumlikes = standartCard.likes;
        const likeLong = sumlikes.length;
        const likesCard = targetCard.querySelector(".element__likes");
        likesCard.textContent = likeLong;
        eventTargetLikeActive.setAttribute("src", likeWhite);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteCard(evt) {
  const eventTargetDelete = evt.target;
  const idDel = eventTargetDelete.getAttribute("id");
  const removingAnItem = eventTargetDelete.closest(".element");
  removingAnItem.setAttribute("disabled", true);

  const cartDelete = deleteMyCard(idDel);
  cartDelete
    .then((result) => {
      removingAnItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function createCard(item, user) {
  const elementCopy = getCard(item, user);
  container.prepend(elementCopy);
}

function getCard(item, user) {
  const standartCard = item;
  const idCardDel = user;

  const imageName = standartCard.name;
  const imageSrc = standartCard.link;
  const idCard = standartCard._id;
  const sumlikes = standartCard.likes;
  const likeLong = sumlikes.length;
  const elementTemplate = document.querySelector("#card-template").content;
  const elementCopy = elementTemplate.querySelector(".element").cloneNode(true);
  const card = elementCopy;
  const cardImage = card.querySelector(".element__image-element");
  const cardLike = card.querySelector(".like");
  const cardDelete = card.querySelector(".delete");

  card.querySelector(".element__title").textContent = imageName;
  cardImage.setAttribute("src", imageSrc);
  cardImage.setAttribute("alt", imageName);
  card.querySelector(".element__likes").textContent = likeLong;

  sumlikes.forEach(function (item) {
    const mylike = item;
    const idMylike = mylike._id;
    const myLikeOne = idMylike;
    if (idCardDel === myLikeOne) {
      cardLike.setAttribute("src", likeBlack);
    } else {
      cardLike.setAttribute("src", likeWhite);
    }
  });
  cardLike.addEventListener("click", function (evt) {
    likes(evt, idCard, card);
  });
  const targetCardProfile = standartCard.owner;
  const idTargetCardProfile = targetCardProfile._id;
  if (idCardDel === idTargetCardProfile) {
    cardDelete.setAttribute("id", idCard);
    cardDelete.addEventListener("click", function (evt) {
      deleteCard(evt, idCard);
    });
  } else {
    cardDelete.removeAttribute("src");
  }
  card.querySelector(".element__picture").addEventListener("click", function (evt) {
    openPopup(popupPicture);
  });
  cardImage.addEventListener("click", getSrcPicture, true);
  return card;
}