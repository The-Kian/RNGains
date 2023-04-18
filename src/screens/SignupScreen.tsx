import { useContext, useState } from "react";

import AuthContent from "../components/auth/AuthContent";
import { CredentialsType } from "../components/auth/authTypes"
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../components/auth/AuthProvider";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { register } = useContext(AuthContext);

  async function signupHandler(email: string, password: string) {
    setIsAuthenticating(true);
    await register({ email, password });
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up..." />;
  }

  return (
    <AuthContent
      onSubmit={(credentials: CredentialsType) => {
        signupHandler(credentials.email, credentials.password);
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
