import SignInButton from "./SignInButton";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md p-4">
        <div>
          <h1 className="font-semibold text-lg mb-2">
            SnelMelder instellingen
          </h1>
          <p className="mb-4">
            Je kunt inloggen met je werk account. Lukt het niet om in te loggen?
            Neem dan contact op met ICT.
          </p>
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
