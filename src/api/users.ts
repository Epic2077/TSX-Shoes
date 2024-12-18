import { useNavigate } from "react-router-dom";
import Api from "./Base";

export const getUsers = async () => {
  try {
    const response = await Api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const findUserById = async (id: string) => {
  try {
    const users = await getUsers();
    return users.find((user: { id: string }) => user.id === id);
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};

export const authenticateUser = async (email: string, password: string) => {
  try {
    const users = await Api.get("/users"); // Fetch all users from the backend
    const user = users.data.find(
      (user: { email: string; password: string }) => user.email === email
    );

    if (!user) {
      throw new Error("Email not found");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    return user; // Return the user object if the email and password match
  } catch (error) {
    console.error("Authentication error:", error);
    throw error; // Propagate the error to be handled in the Login component
  }
};
