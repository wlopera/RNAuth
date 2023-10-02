import { useContext, useState } from "react";
import { Alert } from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/Auth";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContext)

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
      setIsAuthentication(false);
    }
  };

  if (isAuthentication) {
    return <LoadingOverlay message="Conectando usuario..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
