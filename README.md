# RNAuth
APP React Native autenticación con Firebase 

* Crear el proyecto RNAuth
> Expo init RNAuth

* Levantar el proyecto
	> npx expo start --reset-cache   o
  > npx expo start –tunnel    o
  > npm run start

### Agregar librerías Navegación
```
"dependencies": {
    "@react-navigation/native": "^6.1.8",
    "@react-navigation/native-stack": "^6.9.14",
    "@react-navigation/stack": "^6.3.18",
    "expo": "~49.0.13",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.5"
  },
```
* Proceso de autenticación APP – API Backend. SE debería generar un token de autenticación

![image](https://github.com/wlopera/RNAuth/assets/7141537/7daba2b8-234c-478d-afc5-9dcd28340224)

Ese token es luego utilizado por el APP para futuras consultas HHTP al Backend

* Crear autenticador en Backend, uso de Firebase. 
*	Se esta utilizando la DB: react-native-expenses del APP anterior.

![image](https://github.com/wlopera/RNAuth/assets/7141537/79f2e454-494c-468b-98f5-3f3cf897800c)

* Agregar un proveedor nuevo
* Se puede utilizar proveedores nativos
* Vamos a configurar por user/password

![image](https://github.com/wlopera/RNAuth/assets/7141537/d6fed3b6-764a-40a6-b338-917627e9ef77)
![image](https://github.com/wlopera/RNAuth/assets/7141537/98c4f7e3-fc83-4ec8-b58d-220787cf67b3)

* Documentación Firebase
 > https://firebase.google.com/docs/reference/rest/auth?hl=es-419#section-sign-in-email-password

![image](https://github.com/wlopera/RNAuth/assets/7141537/eab0a095-4776-4a3c-95de-72a242b71d26)
 
* Consultar API_KEY en Firebase.
*	En la configuración de mi proyecto. Buscar la KEY_API

![image](https://github.com/wlopera/RNAuth/assets/7141537/136d959c-7f22-41a4-8c7b-8771ec640d98)
![image](https://github.com/wlopera/RNAuth/assets/7141537/4daefc58-a23e-4e3e-92d7-867cb2ccc0ab)

* Clave de API web: AIzaSyBRdrO8ibgmhx9VUn1odO_23hbGhWGAgFc [API_KEY]
* Sustituir la KEY_API copiada en mi código

### Código de Auth.js

```
const authenticate = async (mode, email, password) => {
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

```

###	Levantar y probar crear usuario en Firebase

![image](https://github.com/wlopera/RNAuth/assets/7141537/519b9484-37ee-4ab0-ba42-40c4f95e55df)

* Se generá usuario en Firebase

![image](https://github.com/wlopera/RNAuth/assets/7141537/4700b00f-a098-4498-86f9-ac103c24f421)


### Levantar y probar consulta usuario en Firebase

![image](https://github.com/wlopera/RNAuth/assets/7141537/4aa4980d-472a-4a55-b24b-8d0fce48aa75)
![image](https://github.com/wlopera/RNAuth/assets/7141537/7fa65615-5586-4308-91e4-ef53cc8e9a0a)
![image](https://github.com/wlopera/RNAuth/assets/7141537/3943d106-2e1c-4a03-bf45-143fa411df1a)


