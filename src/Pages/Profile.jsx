import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <p className="text-center mt-8 text-gray-800 dark:text-gray-200">
        Loading user info...
      </p>
    );
  }

  return (
    <div className="bg-[#f1f8e9] min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto bg-gradient-to-br from-green-100 to-green-400 rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
            alt="User avatar"
            className="w-20 h-20 rounded-full border-2 border-green-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-green-900">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-gray-700">{user.email}</p>
            <p className="text-sm text-gray-700">+{user.phone_number}</p>
            <span className="inline-block mt-2 px-2 py-1 text-xs text-white bg-green-600 rounded">
              Role: {user.role}
            </span>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
