import { PrimaryButton } from "@fluentui/react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => instance.loginRedirect(loginRequest);

  return <PrimaryButton text="Inloggen" onClick={handleLogin} type="none" />;
};

export default SignInButton;
