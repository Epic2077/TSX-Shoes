import React, { useEffect, useState } from "react";
import { Input } from "../../components/Auth-components/loginInput/input";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/users";

const Forgot: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const checkEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const users = await getUsers();
      const user = users.find(
        (user: { email: string }) => user.email === email
      );

      if (user) {
        navigate("/Auth/ChangePassword", { state: { userId: user.id } });
      } else {
        setError("Email not found. Please try again.");
      }
    } catch (err) {
      console.error("Error checking email:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form action="" onSubmit={checkEmail} className="px-6 py-[67px]">
      <h1 className="font-semibold text-[32px] text-center mb-12">
        Forgot Password
      </h1>
      <Input
        icon="user"
        placeholder="Username / Email"
        name="user"
        type="text"
        id="user"
        value={email}
        onChange={handleEmailChange}
      />
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
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
        className={`absolute bottom-0 mb-[60px] bg-black text-white cursor-pointer grid justify-center items-center w-[380px] h-12 rounded-full`}
      >
        Send
      </button>
    </form>
  );
};
export default Forgot;
