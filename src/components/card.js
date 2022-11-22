import { openPopupPicture, openPopup, closePopup, getSrcPicture } from "./utils.js";
import { getMyUser, getAllCards, deleteMyCard } from "./api.js";
import likeWhite from "../images/Group.svg";
import likeBlack from "../images/Union.svg";
export function likes(evt) {
  const eventTargetLikeActive = evt.target;
  eventTargetLikeActive.setAttribute("disabled", true);
  const idLike = eventTargetLikeActive.getAttribute("id");
  const statusLike = eventTargetLikeActive.getAttribute("src");
  if (statusLike === likeWhite) {
    const putLike = fetch("https://nomoreparties.co/v1/wbf-cohort-2/cards/likes/" + idLike, {
      method: "PUT",
      headers: {
        authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        const putResult = result;
        console.log("что возвращает Put?" + " " + putResult);
        return putResult;
      })
      .catch((err) => {
        console.log(err);
      });
    const getLike = fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-2/cards", {
      method: "GET",
      headers: {
        authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        const initialCards = result;
        return initialCards;
      })
      .catch((err) => {
        console.log(err);
      });
    Promise.all([putLike, getLike]).then((arr) => {
      const putLikes = arr[0];
      const initialCards = arr[1];
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
    });
  } else {
    const delLike = fetch("https://nomoreparties.co/v1/wbf-cohort-2/cards/likes/" + idLike, {
      method: "DELETE",
      headers: {
        authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        const delResult = result;
        return delResult;
      })
      .catch((err) => {
        console.log(err);
      });
    const getLikeDelete = fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-2/cards", {
      method: "GET",
      headers: {
        authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        const initialCards = result;
        return initialCards;
      })
      .catch((err) => {
        console.log(err);
      });
    Promise.all([delLike, getLikeDelete]).then((arr) => {
      const putLikes = arr[0];
      const initialCards = arr[1];

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
    });
  }
}
export function deleteCard(evt) {
  const eventTargetDelete = evt.target;
  const idDel = eventTargetDelete.getAttribute("id");
  const removingAnItem = eventTargetDelete.closest(".element");
  removingAnItem.setAttribute("disabled", true);
  removingAnItem.remove();
  deleteMyCard(idDel);
}
export function createArrayCards() {
  Promise.all([getMyUser, getAllCards]).then((arr) => {
    const idCardDel = arr[0];
    const initialCards = arr[1];

    initialCards.forEach(function (item) {
      const standartCard = item;
      const container = document.querySelector(".elements");
      const elementTemplate = document.querySelector("#card-template").content;
      const elementCopy = elementTemplate.querySelector(".element").cloneNode(true);
      container.prepend(elementCopy);
      const card = container;
      const imageName = standartCard.name;
      const imageSrc = standartCard.link;
      const idCard = standartCard._id;
      const sumlikes = standartCard.likes;
      const likeLong = sumlikes.length;
      const likesCard = (document.querySelector(".element__likes").textContent = likeLong);
      const countLike = document.querySelector(".element__likes").setAttribute("id", idCard);
      const targetCardProfile = standartCard.owner;
      const idTargetCardProfile = targetCardProfile._id;
      if (idCardDel === idTargetCardProfile) {
        card.querySelector(".delete").setAttribute("id", "my");
        card.querySelector(".delete").setAttribute("id", idCard);
        card.querySelector(".element__delete").addEventListener("click", deleteCard, true);
      } else {
        card.querySelector(".delete").setAttribute("id", "not");
        card.querySelector(".delete").removeAttribute("src");
      }
      card.querySelector(".like").setAttribute("src", likeWhite);
      card.querySelector(".like").setAttribute("id", idCard);
      card.querySelector(".element__picture").addEventListener("click", openPopupPicture, true);
      card.querySelector(".element__vector").addEventListener("click", likes, true);
      const likesCardLike = (document.querySelector(".element__likes").textContent = likeLong);
      const titleOneNew = (document.querySelector(".element__title").textContent = imageName);
      const linkCardNew = document.querySelector(".element__image-element").setAttribute("src", imageSrc);
      const linkCardAlt = document.querySelector(".element__image-element").setAttribute("alt", imageName);
      const idCardNew = document.querySelector(".element__image-element").setAttribute("id", idCard);
    });
  });
}
export function createNewCard() {
  const popupNewMesto = document.querySelector("#new-mesto");
  const nameImageEdit = document.querySelector("#nameImage");
  const addLinkEdit = document.querySelector("#addLink");
  const addButton = document.querySelector(".add-button").addEventListener("click", () => openPopup(popupNewMesto));
  const elementTitle = document.querySelector(".element__title");
  const linkCard = document.querySelector(".element__image-element");
  const textButtonCreateCard = document.querySelector("#create");
  nameImageEdit.setAttribute("value", "Название");
  addLinkEdit.setAttribute("value", "Ссылка на картинку");
  const submitCreate = document.querySelector(".form-new").addEventListener("click", function (evt) {
    if (evt.target.classList.contains("form__submit-button")) {
      const valueImageName = document.getElementById("nameImage").value;
      const valueImageSrc = document.getElementById("addLink").value;
      const container = document.querySelector(".elements");
      const elementTemplate = document.querySelector("#card-template").content;
      const elementCopy = elementTemplate.querySelector(".element").cloneNode(true);
      container.prepend(elementCopy);
      const card = container;
      const titleOneNew = (document.querySelector(".element__title").textContent = valueImageName);
      const linkCardNew = document.querySelector(".element__image-element").setAttribute("src", valueImageSrc);
      const linkCardAlt = document.querySelector(".element__image-element").setAttribute("alt", valueImageName);
      card.querySelector(".like").setAttribute("src", likeWhite);
      textButtonCreateCard.textContent = "Создание...";
      card.querySelector(".element__picture").addEventListener("click", openPopupPicture, true);
      const postCards = fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-2/cards", {
        method: "POST",
        headers: {
          authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: valueImageName,
          link: valueImageSrc,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          console.log(result);
          const postResult = result;
          return postResult;
        })
        .catch((err) => {
          console.log(err);
        });
      Promise.all([postCards]).then((arr) => {
        fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-2/cards", {
          method: "GET",
          headers: {
            authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
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
                card.querySelector(".delete").setAttribute("id", "my");
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
            closePopup(popupNewMesto);
            const buttonCreate = document.querySelector("#create");
            buttonCreate.setAttribute("disabled", true);
            buttonCreate.classList.add("form__submit-button_color_noactive");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
}