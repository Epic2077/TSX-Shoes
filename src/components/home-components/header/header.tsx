import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../../api/UserAuth";

const HomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await isUserLoggedIn();
      if (isLoggedIn) {
        const storedUser =
          localStorage.getItem("user") || sessionStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.name);
        }
      }
    };
    checkLoginStatus();
  }, []);

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
            onClick={() => navigate("/Auth/Login")}
          >
            {userName ? userName : "Sign In"}
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
