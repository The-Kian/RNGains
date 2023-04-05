import { useContext, useState } from "react";

import { credentialsType } from "../components/auth/AuthForm";
import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../context/AuthProvider";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useContext(AuthContext);

  async function loginHandler(email: string, password: string) {
    setIsAuthenticating(true);
    await login({ email, password });
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <AuthContent
      authScreenType="login"
      onSubmit={(credentials: credentialsType) => {
        console.log('onSubmit')
        loginHandler(credentials.email, credentials.password)
      }}
      credentialsInvalid={{
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false,
      }}
    />
  );
}

export default LoginScreen;
