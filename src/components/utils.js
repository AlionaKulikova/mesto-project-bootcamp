import { openPopup, closePopup } from "./modal.js";

const maxPicture = document.querySelector(".picture__images");
const pictureCaption = document.querySelector(".picture__caption");

export function getSrcPicture(evt) {
  const evtTargetPicture = evt.target;
  const valSrc = evtTargetPicture.getAttribute("src");
  const valCaption = evtTargetPicture.getAttribute("alt");
  maxPicture.setAttribute("src", valSrc);
  pictureCaption.textContent = valCaption;
}