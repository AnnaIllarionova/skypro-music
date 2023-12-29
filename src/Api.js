const baseURL = "https://skypro-music-api.skyeng.tech";

export async function authorizationForNewUser({ email, password, username }) {
  const response = await fetch(
    `${baseURL}/user/signup/`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const dataNewUser = await response.json();

  if (response.status === 400) {
    const emailError = dataNewUser.email ? `Email: ${dataNewUser.email}` : "";
    const passwordError = dataNewUser.password
      ? `Пароль: ${dataNewUser.password}`
      : "";
    const usernameError = dataNewUser.username
      ? `Имя пользователя: ${dataNewUser.username}`
      : "";

    console.log(dataNewUser);
    throw new Error(
      `${emailError}\n 
      ${passwordError}\n 
      ${usernameError}`,
    );
  }
  if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  console.log(dataNewUser);
  return dataNewUser;
}

export async function loginUser({ email, password }) {
  const response = await fetch(
    `${baseURL}/user/login/`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    },
  );
  const userData = await response.json();

  const emailError = userData.email ? `Email: ${userData.email}` : "";
  const passwordError = userData.password ? `Пароль: ${userData.password}` : "";
  const usernameError = userData.username
    ? `Имя пользователя: ${userData.username}`
    : "";

  if (response.status === 400) {
    throw new Error(
      `${emailError}\n 
      ${passwordError}\n 
      ${usernameError}`,
    );
  }
  if (response.status === 401) {
    throw new Error(`${userData.detail}`);
  }
  if (response.status === 500) {
    alert("Сервер сломался");
  }
  console.log(userData);
  return userData;
}
