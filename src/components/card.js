import { getMyUser, getAllCards, deleteMyCard, postCard, putLikes, delLikes } from "./api.js";
import { openPopupPicture, getSrcPicture } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import likeWhite from "../images/Group.svg";
import likeBlack from "../images/Union.svg";

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
  const container = document.querySelector(".elements");
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
  card.querySelector(".element__title").textContent = imageName;
  card.querySelector(".element__image-element").setAttribute("src", imageSrc);
  card.querySelector(".element__image-element").setAttribute("alt", imageName);
  card.querySelector(".element__likes").textContent = likeLong;

  sumlikes.forEach(function (item) {
    const mylike = item;
    const idMylike = mylike._id;
    const myLikeOne = idMylike;
    if (idCardDel === myLikeOne) {
      card.querySelector(".like").setAttribute("src", likeBlack);
    } else {
      card.querySelector(".like").setAttribute("src", likeWhite);
    }
  });
  card.querySelector(".like").addEventListener("click", function (evt) {
    likes(evt, idCard, card);
  });
  const targetCardProfile = standartCard.owner;
  const idTargetCardProfile = targetCardProfile._id;
  if (idCardDel === idTargetCardProfile) {
    card.querySelector(".delete").setAttribute("id", idCard);
    card.querySelector(".delete").addEventListener("click", function (evt) {
      deleteCard(evt, idCard);
    });
  } else {
    card.querySelector(".delete").removeAttribute("src");
  }
  card.querySelector(".element__picture").addEventListener("click", function (evt) {
    const popupPicture = document.querySelector("#picture");
    openPopup(popupPicture);
  });
  card.querySelectorAll(".element__image-element").forEach(function (evt) {
    evt.addEventListener("click", getSrcPicture, true);
  });

  return card;
}