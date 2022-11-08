export function validFormProfile() {
  const form = document.querySelector("#form");
  const validators = {
    name: validateUsername,
    job: validateJob,
  };

  const inputGroups = {
    name: "#nameInputGroup",
    job: "#nameInputGroupSecond",
  };

  form.addEventListener("input", (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);
    const error = validate(key, value, values);

    if (error) {
      setError(key, error);
    } else {
      removeError(key);
    }

    let isFormValid = true;

    formData.forEach((value, key) => {
      const error = validate(key, value, values);

      if (!error) {
        return;
      }

      setError(key, error);
      isFormValid = false;
    });
    if (!isFormValid) {
      const buttonSave = document.querySelector("#save");
      buttonSave.setAttribute("disabled", true);
      buttonSave.classList.add("form__submit-button_color_noactive");
      return;
    }
    const buttonSave = document.querySelector("#save");
    buttonSave.removeAttribute("disabled");
    buttonSave.classList.remove("form__submit-button_color_noactive");
    return;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  function setError(key, errorMessage) {
    const inputGroup = inputGroups[key];
    const element = form.querySelector(inputGroup);
    const input = element.querySelector(".form__field");
    input.classList.add("form__input_invalid");
    const error = element.querySelector(".form__error");
    error.textContent = errorMessage;
    error.classList.remove("form__error_hidden");
  }

  function removeError(key) {
    const inputGroup = inputGroups[key];
    const element = form.querySelector(inputGroup);
    const input = element.querySelector(".form__field");
    input.classList.remove("form__input_invalid");
    const error = element.querySelector(".form__error");
    error.textContent = null;
    error.classList.add("form__error_hidden");
  }

  function validate(key, value, values) {
    const validator = validators[key];
    return validator(value, values);
  }

  function validateUsername(value, values) {
    if (!value) {
      return "Вы пропустили это поле";
    }
    if (value.length < 2) {
      return "Минимальное количество символов:2. Длина текста сейчас: 1 символ";
    }
    if (value.length > 40) {
      return "Максимальное количество символов:40";
    }
    return null;
  }

  function validateJob(value, values) {
    if (!value) {
      return "Вы пропустили это поле";
    }
    if (value.length < 2) {
      return "Минимальное количество символов:2. Длина текста сейчас: 1 символ";
    }
    if (value.length > 200) {
      return "Максимальное количество символов:40";
    }
    return null;
  }
}

export function validFormNewMesto() {
  const formNew = document.querySelector("#form-new");
  const validatorsNew = {
    nameImage: validateNameCard,
    addLink: validateLink,
  };
  const inputGroupsNew = {
    nameImage: "#nameCard",
    addLink: "#linkCard",
  };

  formNew.addEventListener("input", (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);
    const error = validateNew(key, value, values);
    if (error || !!error) {
      setErrorNewCard(key, error);
    } else {
      removeErrorNewCard(key);
    }

    let isFormValidNew = true;
    formData.forEach((value, key) => {
      const error = validateNew(key, value, values);
      if (!error) {
        return;
      }
      setErrorNewCard(key, error);
      isFormValidNew = false;
    });
    if (!isFormValidNew) {
      const buttonCreate = document.querySelector("#create");
      buttonCreate.setAttribute("disabled", true);
      buttonCreate.classList.add("form__submit-button_color_noactive");
      return;
    }
    const buttonCreate = document.querySelector("#create");
    buttonCreate.removeAttribute("disabled");
    buttonCreate.classList.remove("form__submit-button_color_noactive");
    return;
  });
  formNew.addEventListener("submit", (e) => {
    e.preventDefault();
    buttonCreate.setAttribute("disabled", true);
    buttonCreate.classList.add("form__submit-button_color_noactive");
  });

  function setErrorNewCard(key, errorMessage) {
    const inputGroupNew = inputGroupsNew[key];
    const element = formNew.querySelector(inputGroupNew);
    const input = element.querySelector(".form__field_name_text");
    input.classList.add("form__input_invalid");
    const error = element.querySelector(".form__error");
    error.textContent = errorMessage;
    error.classList.remove("form__error_hidden");
  }

  function removeErrorNewCard(key) {
    const inputGroupNew = inputGroupsNew[key];
    const element = formNew.querySelector(inputGroupNew);
    const input = element.querySelector(".form__field_name_text");
    input.classList.remove("form__input_invalid");
    const error = element.querySelector(".form__error");
    error.textContent = null;
    error.classList.add("form__error_hidden");
  }

  function validateNew(key, value, values) {
    const validatorNew = validatorsNew[key];
    return validatorNew(value, values);
  }

  function validateNameCard(value) {
    if (!value) {
      return "Вы пропустили это поле";
    }
    if (value.length < 2) {
      return "Минимальное количество символов:2. Длина текста сейчас: 1 символ";
    }
    if (value.length > 30) {
      return "Максимальное количество символов:40";
    }
    return null;
  }

  function validateLink(value) {
    if (!value) {
      return "Вы пропустили это поле";
    }
    const input = document.createElement("input");
    input.type = "url";
    input.required = true;
    input.value = value;
    const isValid = typeof input.checkValidity === "function" ? input.checkValidity() : /\S+@\S+\.\S+/.test(value);
    if (isValid) {
      return null;
    }
    return "Введите адрес сайта";
  }
}