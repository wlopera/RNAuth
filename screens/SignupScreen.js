import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function SignupScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const signupHandler = async ({ email, password }) => {
    setIsAuthentication(true);
    await createUser(email, password);
    setIsAuthentication(false);
  };

  if (isAuthentication) {
    return <LoadingOverlay message="Creando usuario..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
