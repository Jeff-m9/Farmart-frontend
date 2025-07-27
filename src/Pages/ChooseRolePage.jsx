import { useNavigate } from "react-router-dom";

function ChooseRolePage() {
  const navigate = useNavigate();

  const handleChoose = (role) => {
    // Save selected role to localStorage or pass via route
    localStorage.setItem("signup_role", role);
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        What would you like to do?
      </h1>
      <div className="flex gap-10">
        <div
          className="p-6 border-2 border-green-600 rounded-xl cursor-pointer hover:shadow-lg"
          onClick={() => handleChoose("user")}
        >
          <h2 className="text-xl font-semibold text-center text-green-700">
            Buy Animals
          </h2>
          <p className="text-sm text-center text-gray-600">
            I want to purchase livestock
          </p>
        </div>
        <div
          className="p-6 border-2 border-green-600 rounded-xl cursor-pointer hover:shadow-lg"
          onClick={() => handleChoose("farmer")}
        >
          <h2 className="text-xl font-semibold text-center text-green-700">
            Sell Animals
          </h2>
          <p className="text-sm text-center text-gray-600">
            I want to sell my livestock
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseRolePage;
