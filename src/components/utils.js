export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function openPopupPicture(evt) {
  const popupPicture = document.querySelector("#picture");
  openPopup(popupPicture);
  const valPictureSrc = document.querySelectorAll(".element__image-element").forEach(function (evt) {
    evt.addEventListener("click", getSrcPicture, true);
  });
}
export function getSrcPicture(evt) {
  const evtTargetPicture = evt.target;
  const valSrc = evtTargetPicture.getAttribute("src");
  const valCaption = evtTargetPicture.getAttribute("alt");
  const maxPicture = document.querySelector(".picture__images").setAttribute("src", valSrc);
  const pictureCaption = (document.querySelector(".picture__caption").textContent = valCaption);
}