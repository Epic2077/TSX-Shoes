import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsers } from "../../api/users";
import { Input } from "../../components/Auth-components/loginInput/input";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // Retrieve userId passed in navigate state
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getUsers();
        const foundUser = users.find(
          (user: { id: string }) => user.id === userId
        );

        if (foundUser) {
          setUser(foundUser);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("An error occurred. Please try again later.");
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Make a PATCH request to update the password
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH", // Use PATCH to update only the password
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        console.log("Password successfully updated!");
        navigate("/Auth/Login");
      } else {
        setError("Failed to update the password. Please try again.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="font-semibold text-[32px] text-center mb-12">
        Change Password
      </h1>
      {user ? (
        <p>
          Changing password for <strong>{user.email}</strong>
        </p>
      ) : (
        <p>Loading...</p>
      )}
      <form onSubmit={handlePasswordChange} className="grid mt-4">
        <Input
          icon="lock"
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Input
          icon="lock"
          name="confirm-password"
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2 ">{error}</p>}
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
