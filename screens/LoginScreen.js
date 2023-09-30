import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/Auth";

function LoginScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const loginHandler = async ({ email, password }) => {
    setIsAuthentication(true);
    await login(email, password);
    setIsAuthentication(false);
  };

  if (isAuthentication) {
    return <LoadingOverlay message="Conectando usuario..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
