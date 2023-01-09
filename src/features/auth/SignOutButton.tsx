import { useMsal } from "@azure/msal-react";

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <a className="underline cursor-pointer" onClick={handleLogout}>
      Uitloggen
    </a>
  );
};
