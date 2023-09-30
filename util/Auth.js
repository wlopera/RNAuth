import axios from "axios";

const API_KEY = "AIzaSyBRdrO8ibgmhx9VUn1odO_23hbGhWGAgFc";

const authenticate = async (mode, email, password) => {
  console.log("URL:", `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`);
  console.log("email:", email);
  console.log("password:", password);

  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  console.log("Firebase response:", response.data);
};
export const createUser = async (email, password) => {
  await authenticate("signUp", email, password);
};

export const login = async (email, password) => {
  await authenticate("signInWithPassword", email, password);
};

// export const createUser = async (email, password) => {
//   const url =
//     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;

//   const data = {
//     email: email,
//     password: password,
//     returnSecureToken: true,
//   };

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   console.log("URL:", url);
//   console.log("Data:", data);
//   console.log("config:", config);

//   try {
//     const response = await axios.post(url, data, config);
//     console.log("Crear Usuario: ", response);
//   } catch (error) {
//     console.log("Crear Usuario Error: ", error);
//   }
// };
// curl 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRdrO8ibgmhx9VUn1odO_23hbGhWGAgFc' \
// -H 'Content-Type: application/json' --data-binary '{"email": "example@example.com", "password": "password", "returnSecureToken":true}'
