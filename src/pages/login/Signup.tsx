import React from "react";
import LoginHeader from "../../layout/loginHeader/LoginHeader";
import FormLayout from "../../components/signup-form/Form";

const SignupPage: React.FC = () => {
  return (
    <div className="px-6 py-[12px]">
      <LoginHeader />
      <h1 className="mb-4 font-semibold text-[32px] text-center">
        Let's Create An Account
      </h1>
      <FormLayout />
    </div>
  );
};

export default SignupPage;
