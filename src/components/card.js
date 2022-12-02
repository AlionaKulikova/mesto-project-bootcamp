import { getMyUser, getAllCards, deleteMyCard, postCard, putLikes, delLikes } from "./api.js";
import likeWhite from "../images/Group.svg";
import likeBlack from "../images/Union.svg";

export function likes(evt) {
  const eventTargetLikeActive = evt.target;
  eventTargetLikeActive.setAttribute("disabled", true);
  const idLike = eventTargetLikeActive.getAttribute("id");
  const statusLike = eventTargetLikeActive.getAttribute("src");
  if (statusLike === likeWhite) {
    const putLike = putLikes(idLike);
    putLike
      .then((result) => {
        console.log(result);
        const getLike = getAllCards();
        getLike
          .then((result) => {
            console.log(result);
            const initialCards = result;
            initialCards.forEach(function (item) {
              const standartCard = item;
              const idCards = standartCard._id;
              if (idCards === idLike) {
                const name = standartCard.name;
                const likesCard = document.querySelectorAll(".element__likes").forEach(function (evt) {
                  const idTargetCard = evt.getAttribute("id");
                  if (idTargetCard === idLike) {
                    const sumlikes = standartCard.likes;
                    const likeLong = sumlikes.length;
                    const setupContentCount = (evt.textContent = likeLong);
                    eventTargetLikeActive.setAttribute("src", likeBlack);
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const delLike = delLikes(idLike);
    delLike
      .then((result) => {
        console.log(result);
        const getLikeDelete = getAllCards();
        getLikeDelete
          .then((result) => {
            console.log(result);
            const initialCards = result;
            initialCards.forEach(function (item) {
              const standartCard = item;
              const idCards = standartCard._id;
              if (idCards === idLike) {
                const name = standartCard.name;
                const likesCard = document.querySelectorAll(".element__likes").forEach(function (evt) {
                  const idTargetCard = evt.getAttribute("id");
                  if (idTargetCard === idLike) {
                    const sumlikes = standartCard.likes;
                    const likeLong = sumlikes.length;
                    const setupContentCount = (evt.textContent = likeLong);
                    eventTargetLikeActive.setAttribute("src", likeWhite);
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
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
      console.log(result);
      removingAnItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function createCard(item, user) {
  const standartCard = item;
  const idCardDel = user;
  const container = document.querySelector(".elements");
  const elementTemplate = document.querySelector("#card-template").content;
  const elementCopy = elementTemplate.querySelector(".element").cloneNode(true);
  container.prepend(elementCopy);
  const card = elementCopy;
  const imageName = standartCard.name;
  const imageSrc = standartCard.link;
  const idCard = standartCard._id;
  const sumlikes = standartCard.likes;
  const likeLong = sumlikes.length;
  const likesCard = (document.querySelector(".element__likes").textContent = likeLong);
  const countLike = document.querySelector(".element__likes").setAttribute("id", idCard);
  const targetCardLike = standartCard.likes;
  targetCardLike.forEach(function (item) {
    const mylike = item;
    const idMylike = mylike._id;
    if (idCardDel === idMylike) {
      card.querySelector(".like").setAttribute("src", likeBlack);
    } else {
      card.querySelector(".like").setAttribute("src", likeWhite);
    }
  });
  const targetCardProfile = standartCard.owner;
  const idTargetCardProfile = targetCardProfile._id;
  if (idCardDel === idTargetCardProfile) {
    card.querySelector(".delete").setAttribute("id", idCard);
  } else {
    card.querySelector(".delete").removeAttribute("src");
  }
  card.querySelector(".like").setAttribute("id", idCard);
  const titleOneNew = (document.querySelector(".element__title").textContent = imageName);
  const linkCardNew = document.querySelector(".element__image-element").setAttribute("src", imageSrc);
  const linkCardAlt = document.querySelector(".element__image-element").setAttribute("alt", imageName);
  const idCardNew = document.querySelector(".element__image-element").setAttribute("id", idCard);
  return card;
}

export function createCardNew(name, link) {
  const valueImageName = name;
  const valueImageSrc = link;
  const container = document.querySelector(".elements");
  const elementTemplate = document.querySelector("#card-template").content;
  const elementCopy = elementTemplate.querySelector(".element").cloneNode(true);
  container.prepend(elementCopy);
  const card = elementCopy;
  const titleOneNew = (document.querySelector(".element__title").textContent = valueImageName);
  const linkCardNew = document.querySelector(".element__image-element").setAttribute("src", valueImageSrc);
  const linkCardAlt = document.querySelector(".element__image-element").setAttribute("alt", valueImageName);
  card.querySelector(".like").setAttribute("src", likeWhite);
  return card;
}