import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => instance.loginRedirect(loginRequest);

  return <button onClick={handleLogin}>Sign in using Redirect</button>;
};

export default SignInButton;
