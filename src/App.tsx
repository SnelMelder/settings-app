import { useIsAuthenticated } from "@azure/msal-react";
import SignInButton from "./components/SignInButton";
import { SignOutButton } from "./components/SignOutButton";

function App() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <SignOutButton />;
  } else {
    return <SignInButton />;
  }
}

export default App;
