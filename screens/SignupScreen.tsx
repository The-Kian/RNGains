import { useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function signupHandler(email: string, password: string) {
    setIsAuthenticating(true)
    //await createUser(email,password)
    setIsAuthenticating(false)
    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up..." />;
  }
  
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;