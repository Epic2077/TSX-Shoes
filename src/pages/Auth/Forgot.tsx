import React from "react";
import { Input } from "../../components/loginInput/input";

const Forgot: React.FC = () => {
  return (
    <form action="">
      <h1>Forgot Password</h1>
      <Input
        icon="user"
        placeholder="Username / Email"
        name="user"
        type="text"
        id="user"
      />
    </form>
  );
};
export default Forgot;
