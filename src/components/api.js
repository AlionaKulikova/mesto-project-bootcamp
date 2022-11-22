import { openPopupPicture, openPopup, closePopup, getSrcPicture } from "./utils.js";
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-2",
  headers: {
    authorization: "cbaadd20-b391-4efb-b28f-0fe45b806ecd",
    "Content-Type": "application/json",
  },
};
export const getMyUser = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
     const myProfile = result;
    const idCardDel = myProfile._id;
    return idCardDel;
  })
  .catch((err) => {
    console.log(err);
  });
export const getAllCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
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
export function deleteMyCard(evt) {
  const idDel = evt;
  fetch(`${config.baseUrl}/cards/` + idDel, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log(result);
      const deleteCards = result;
      return initialCards;
    })
    .catch((err) => {
      console.log(err);
    });
}