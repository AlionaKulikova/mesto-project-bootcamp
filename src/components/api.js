const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-3",
  headers: {
    authorization: "e91d2d7a-7934-4811-b5d2-d42326a1cfb9",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getMyUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

export function getAllCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

export function deleteMyCard(evt) {
  const idDel = evt;
  return fetch(`${config.baseUrl}/cards/` + idDel, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

export function postCard(name, link) {
  const valueImageName = name;
  const valueImageSrc = link;
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: valueImageName,
      link: valueImageSrc,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

export function putLikes(like) {
  const idLike = like;
  return fetch(`${config.baseUrl}/cards/likes/` + idLike, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

export function delLikes(del) {
  const idLike = del;
  return fetch(`${config.baseUrl}/cards/likes/` + idLike, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

export function patchUserData(name, about) {
  const enlargingName = name;
  const enlargingJob = about;
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: enlargingName,
      about: enlargingJob,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

export function editPhotoProfil(link) {
  const valueImageSrcPhoto = link;
  console.log(valueImageSrcPhoto);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: valueImageSrcPhoto,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}