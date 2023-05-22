import { useContext, useState } from "react";

import AuthContent from "../../components/auth/AuthContent";
import { CredentialsType } from "../../components/auth/AuthTypes"
import LoadingOverlay from "../LoadingOverlay";
import { AuthContext } from "../../components/auth/AuthProvider";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { register, update } = useContext(AuthContext);

  async function signupHandler(email: string, password: string, displayName: string) {
    setIsAuthenticating(true);
    await register({ email, password });
    await update({displayName})
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up..." />;
  }

  return (
    <AuthContent
      onSubmit={(credentials: CredentialsType) => {
        signupHandler(credentials.email, credentials.password, credentials.displayName);
      }}
      credentialsInvalid={{
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false,
      }}
      authScreenType={"signUp"}
    />
  );
}

export default SignupScreen;
