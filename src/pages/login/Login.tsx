import React from "react";
import Back from "../../layout/header.tsx/back";

const LoginPage: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="px-6 py-[12px]">
      <Back address="/" />
      <div className="mt-[76px] mb-[118px] grid justify-center items-center">
        <img src="../../../src/assets/icons/black-logo.svg" alt="Logo" />
      </div>
      <h1 className="text-center font-semibold text-[32px] text-black">
        Login to Your Account
      </h1>
      <form action="" className="mt-11">
        <div className="w-full h-[37px] bg-[#FAFAFA] flex p-[13px] items-center">
          <img src="../../../src/assets/icons/email.svg" alt="email" />
          <input
            type="email"
            name="email"
            className="p-[4px] bg-transparent h-[24px] w-full outline-none"
            placeholder="Email"
          />
        </div>
        <div className="w-full h-[37px] bg-[#FAFAFA] flex p-[13px] items-center">
          <img src="../../../src/assets/icons/lock.svg" alt="pass" />
          <input
            type="password"
            name="password"
            className="p-[4px] bg-transparent h-[24px] w-full outline-none"
            placeholder="Password"
            id="pass"
          />
          <img
            src="../../../src/assets/icons/eye.svg"
            alt="hide"
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
