import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import ProjectsPage from "../features/projects/ProjectsPage";
import LoginPage from "../features/auth/LoginPage";

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <ProjectsPage />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
