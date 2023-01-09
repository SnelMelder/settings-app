import { SignOutButton } from "../auth/SignOutButton";

const TopBar = () => {
  return (
    <div className="bg-teal-700 text-white">
      <div className="max-w-5xl mx-auto p-4 flex flex-row justify-between items-center">
        <h1>SnelMelder instellingen</h1>
        <SignOutButton />
      </div>
    </div>
  );
};

export default TopBar;
