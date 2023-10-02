import { useContext, useState } from "react";
import { Alert } from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/Auth";
import { AuthContext } from "../store/auth-context";
import AuthContent from "../components/Auth/AuthContent";

function SignupScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    setIsAuthentication(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert(
        "Fallo la autenticación!",
        "No se pudo crear usuario. Favor intente nuevamente"
      );
      setIsAuthentication(false);
    }
  };

  if (isAuthentication) {
    return <LoadingOverlay message="Creando usuario..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
