# RNAuth
APP React Native autenticación con Firebase 

VER DOCUMENTO: doc/React Native - RNAuth.docx

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


### Manejo de Errores. Ejemplo usuario no existe en Firebase
```
const signupHandler = async ({ email, password }) => {
    setIsAuthentication(true);
    try {
      const response = await createUser(email, password);
      console.log("Firebase response:", response.data);
    } catch (error) {
      console.log("Login Error:", error)
      Alert.alert(
        "Fallo la autenticación!",
        "No se pudo crear usuario. Favor intente nuevamente"
      );
    }
    setIsAuthentication(false);
  };
```
 

##### Guardando el token para uso de llamadas HTTP
* Crear auth-context.js (API Context de React)
  
```
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
```

* Modificar Auth.js 

```
import axios from "axios";

const API_KEY = "AIzaSyBRdrO8ibgmhx9VUn1odO_23hbGhWGAgFc";
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
  return response.data.idToken;
};
export const createUser = (email, password) => {
  return authenticate("signUp", email, password);
};
export const login = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
```
 
* Ajustar llamadas al contexto para almacenar el token

```
import AuthContext from "../store/auth-context”

function LoginScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    setIsAuthentication(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert(
        "Fallo la autenticación!",
        "No se pudo conectar. Favor validar sus credenciales"
      );
    }
    setIsAuthentication(false);
  };
```

* En la App.js se está utilizando un artificio que se denomina “Protección de Pantalla “, bajo ninguna circunstancia se pueda llegar a determinadas pantallas si no se cumple una condición. En este caso si no estas conectado y tienes token.

* No se puede llegar a WelcomeScreen, si no estas autenticado
```
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
```

 * Ajuste del lado del APP.js para que oculte o muestre las ventanas según si se esta conectado y con token válido
 
```
…
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

```
* Si me conecto o creo un nuevo usuario. Retorna el Token del usuario

![image](https://github.com/wlopera/RNAuth/assets/7141537/c496f1b3-bbbc-4ac3-994d-f8b1d87eee85)

### Proceso de Logout

* Agregar botón de logout en App.js

```
…
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
…
```

![image](https://github.com/wlopera/RNAuth/assets/7141537/1052dcbb-dba4-46e2-abee-6771b0835f03)


### Demostración de uso de data en Backend (uso del token)
 * En Firebase generar una cadena que contiene data

 ![image](https://github.com/wlopera/RNAuth/assets/7141537/c1d08ba9-7e24-4a9a-b163-2927c292658c)

* Copiamos la ruta para la llamada a mi servicio generado

![image](https://github.com/wlopera/RNAuth/assets/7141537/222f70cf-2fe5-45cc-9743-391db70fee18)

   ** https://react-native-expenses-14061-default-rtdb.firebaseio.com/message.json

* Invocamos la llamada a ese servicio API

```
import axios from "axios";

function WelcomeScreen() {
  const [fetchMessage, setFetchMessage] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://react-native-expenses-14061-default-rtdb.firebaseio.com/message.json"
      )
      .then((response) => {
        console.log("respuesta:", response.data);
        setFetchMessage(response.data);
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Bienvenido!</Text>
      <Text>Autenticado exitosamente!</Text>
    </View>
  );
}
…
```

![image](https://github.com/wlopera/RNAuth/assets/7141537/468079ef-542a-413c-95ff-bf92d69e4cca)


* La llamada al servicio debe estar protegida con el token, validar si el usuario está conectado
* Modificamos la regla en Firebase. Los servicios de lectura y escritura deben validar si el usuario está autorizado. Uso de token

![image](https://github.com/wlopera/RNAuth/assets/7141537/10f85f0b-5b11-4618-b47b-c7b9dd75337a)

* Actualizamos la llamada a nuestro servicio message mediante l uso del token. Componente WelcomeScreen

```
…
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchMessage, setFetchMessage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        `https://react-native-expenses-14061-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => {
        console.log("respuesta:", response.data);
        setFetchMessage(response.data);
      });
  }, [token]);
…
```

![image](https://github.com/wlopera/RNAuth/assets/7141537/e2a1021f-0c4f-43fe-a9da-ae31786b1541)



 
 
