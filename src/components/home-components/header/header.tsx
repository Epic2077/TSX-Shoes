import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const HomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.username);

  const handleUserClick = () => {
    if (user) {
      navigate("/profile"); // Navigate to profile if user exists
    } else {
      navigate("/Auth/Login"); // Navigate to login if no user
    }
  };

  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="w-12 h-12 bg-black flex justify-center items-center rounded-full">
          <img
            src="../../../src/assets/Images/pfp.png"
            alt="pfp"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="grid gap-1">
          <p className="font-semibold text-base text-[#757475]">
            Good Morning 👋
          </p>
          <p
            className="font-bold text-base cursor-pointer"
            onClick={handleUserClick}
          >
            {user ? user : "Sign In"}
          </p>
        </div>
      </div>
      <div className="flex gap-4 w-16 h-6">
        <img src="../../../src/assets/icons/bell.svg" alt="bell" />
        <img
          src="../../../src/assets/icons/heart.svg"
          alt="heart"
          onClick={() => navigate("/Wishlist")}
        />
      </div>
    </header>
  );
};

export default HomeHeader;
