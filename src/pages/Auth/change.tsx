import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Auth-components/loginInput/input";
import { userChange } from "../../api/UserAuth";
import { Bounce, toast } from "react-toastify";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    if (!token) {
      validationErrors.token = "Token is required.";
    }
    if (newPassword !== confirmPassword) {
      validationErrors.password = "Passwords do not match.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      await userChange(newPassword, token);

      toast.success("Change successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/Auth/Login");
    } catch (err: any) {
      if (err.fieldErrors) {
        setError(err.fieldErrors); // Expecting an object with field-specific error messages
        console.log(err.fieldErrors);
      } else {
        toast.error(err.message || "An error occurred. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="font-semibold text-[32px] text-center mb-12">
        Change Password
      </h1>
      <p className="text-center">
        Please Check Your Email For Change Password Token
      </p>
      <form onSubmit={handlePasswordChange} className="grid mt-4">
        <Input
          icon="lock"
          name="newPassword"
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          customChildren={
            <img
              src="../../../src/assets/icons/eye.svg"
              alt="toggle visibility"
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          }
        />
        {error.newPassword && (
          <p className="text-red-500 text-sm">{error.newPassword}</p>
        )}

        <Input
          icon="lock"
          name="confirm-password"
          type={isPasswordVisible ? "text" : "password"}
          id="confirm-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          customChildren={
            <img
              src="../../../src/assets/icons/eye.svg"
              alt="toggle visibility"
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          }
        />

        <div className="mt-4">
          <Input
            icon="user"
            name="token"
            type="text"
            id="token"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onPaste={(e) => {
              const pastedData = e.clipboardData.getData("text");
              setToken(pastedData);
            }}
          />
        </div>
        {error.token && <p className="text-red-500 text-sm">{error.token}</p>}

        <button
          name="submit"
          id="submit"
          type="submit"
          className="absolute bottom-0 mb-[60px] bg-black text-white cursor-pointer grid justify-center items-center w-[380px] h-12 rounded-full"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
