import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store"; // Make sure this path is correct
import { toast } from "react-toastify";
import { logout } from "../../store/slices/AuthSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    // Clear redux state
    dispatch(logout());

    // Clear localStorage
    localStorage.clear();

    // Show success message
    toast.success("Signed out successfully!");

    // Redirect to login
    navigate("/auth/login");
  };

  return (
    <div className="p-6 max-w-lg mx-auto min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
          <img
            src={"../../../src/assets/Images/pfp.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-semibold">
          {user} {user}
        </h1>
      </div>

      {/* Profile Details */}
      <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
        <div>
          <label className="text-gray-600 text-sm">UserName</label>
          <p className="font-semibold">{user || "Not provided"}</p>
        </div>

        <div>
          <label className="text-gray-600 text-sm">Access Token</label>
          <p className="font-semibold text-xs break-all bg-gray-100 p-2 rounded">
            {token}
          </p>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="w-full bg-black text-white rounded-full py-4 mt-80"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
