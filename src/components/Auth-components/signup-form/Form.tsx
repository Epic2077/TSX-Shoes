import React, { useState } from "react";
import { Input } from "../loginInput/input";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSignup } from "../../../api/UserAuth";

type SignupError = {
  fieldErrors?: Record<string, string>;
  status?: number;
  message?: string;
};

const FormLayout: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    password: "",
    confirmPass: "",
    phone: "",
  });
  const [error, setError] = useState<{
    username?: string;
    email?: string;
    name?: string;
    lastName?: string;
    password?: string;
    confirmPass?: string;
    phone?: string;
  }>({});

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    try {
      await userSignup({
        username: formData.username,
        email: formData.email,
        firstName: formData.name,
        lastName: formData.lastName,
        password: formData.password,
        phone: formData.phone,
<<<<<<< HEAD
        });
=======
      });
>>>>>>> Develop

      toast.success("Signup successful!", {
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
    } catch (err: unknown) {
      const error = err as SignupError;
      if (error.fieldErrors) {
        setError(error.fieldErrors);
      } else if (
        error.status === 400 &&
        error.message === "Email or username already exists."
      ) {
        // Handle specific server error messages
        setError((prev) => ({
          ...prev,
          email: "Email or username already exists.",
        }));
      } else {
        toast.error("An error occurred. Please try again.", {
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
    <>
      <ToastContainer />
      <form className="grid" onSubmit={handleSubmit}>
        <Input
          icon="user"
          placeholder="Username"
          name="username"
          type="text"
          id="userName"
          value={formData.username}
          onChange={handleChange}
        />
        {error.username && (
          <p className="text-red-500 text-sm">{error.username}</p>
        )}
        <Input
          icon="email"
          placeholder="Email"
          name="email"
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        <div className="flex gap-[12px]">
          <Input
            icon="user"
            placeholder="First name"
            name="name"
            type="text"
            id="FirstName"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            icon="user"
            placeholder="Last name"
            name="lastName"
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
        {error.lastName && (
          <p className="text-red-500 text-sm">{error.lastName}</p>
        )}
        <Input
          icon="lock"
          placeholder="Password"
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          value={formData.password}
          onChange={handleChange}
          customChildren={
            <img
              src="../../../src/assets/icons/eye.svg"
              alt="toggle visibility"
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          }
        />
        {error.password && (
          <p className="text-red-500 text-sm">{error.password}</p>
        )}
        <Input
          icon="lock"
          placeholder="Confirm Password"
          name="confirmPass"
          type={isPasswordVisible ? "text" : "password"}
          id="confirmPassword"
          value={formData.confirmPass}
          onChange={handleChange}
          customChildren={
            <img
              src="../../../src/assets/icons/eye.svg"
              alt="toggle visibility"
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          }
        />
        {error.confirmPass && (
          <p className="text-red-500 text-sm">{error.confirmPass}</p>
        )}
        <div className="flex gap-2 ">
          <div className="min-w-[115px] h-[37px] bg-[#FAFAFA] text-[#6C757D] px-[12px] flex items-center gap-1 rounded mt-6">
            <img src="../../../src/assets/icons/gender.svg" alt="gender" />
            <select
              name="gender"
              id="gender"
              className="bg-transparent w-full text-[14px]"
            >
              <option value="gender">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Input
            icon="phone"
            placeholder="Phone Number"
            name="phone"
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
        <div className="flex gap-2 w-full items-start mt-4">
          <input
            type="checkbox"
            name="policy"
            id="policy"
            className="accent-black mt-[6px]"
            required
          />
          <label htmlFor="policy">
            I have read and accept the User Agreement and Privacy Policy.
          </label>
        </div>
        <div className="absolute bottom-0 grid justify-center mb-4">
          <button
            name="submit"
            id="submit"
            type="submit"
            className={`bg-black text-white cursor-pointer grid justify-center items-center w-[380px] h-12 rounded-full mb-5`}
          >
            Sign Up
          </button>
          <div className="flex justify-center gap-5">
            <p className="text-base opacity-50">Have an account?</p>
            <p
              className="text-base cursor-pointer"
              onClick={() => navigate("/Auth/Login")}
            >
              Login Now
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
export default FormLayout;
