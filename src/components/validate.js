const setEventListeners = (formElement, settings) => {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
  const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${settings.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${settings.errorClass}`);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${settings.inputErrorClass}`);
  errorElement.classList.remove(`${settings.errorClass}`);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${settings.inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
    buttonElement.removeAttribute("disabled");
  }
};