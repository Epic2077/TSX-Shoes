import React from "react";
import { Input } from "../../components/loginInput/input";
import { useNavigate } from "react-router-dom";

const Forgot: React.FC = () => {
  const navigate = useNavigate();
  return (
    <form action="" className="px-6 py-[67px]">
      <h1 className="font-semibold text-[32px] text-center mb-12">
        Forgot Password
      </h1>
      <Input
        icon="user"
        placeholder="Username / Email"
        name="user"
        type="text"
        id="user"
      />
      <p
        onClick={() => navigate("/Auth/Login")}
        className="text-right text-base mt-2"
      >
        Back to sign in
      </p>
      <button
        name="submit"
        id="submit"
        type="submit"
        className={` absolute bottom-0 mb-[60px] bg-black text-white cursor-pointer grid justify-center items-center w-[380px] h-12 rounded-full`}
      >
        Send
      </button>
    </form>
  );
};
export default Forgot;
