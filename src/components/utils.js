import { openPopup, closePopup } from "./modal.js";

export function getSrcPicture(evt) {
  const evtTargetPicture = evt.target;
  const valSrc = evtTargetPicture.getAttribute("src");
  const valCaption = evtTargetPicture.getAttribute("alt");
  const maxPicture = document.querySelector(".picture__images").setAttribute("src", valSrc);
  const pictureCaption = (document.querySelector(".picture__caption").textContent = valCaption);
}