import { getUsers } from "./users";

export const isUserLoggedIn = async (): Promise<boolean> => {
  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!storedUser) {
    return false;
  }

  try {
    const parsedUser = JSON.parse(storedUser);
    const users = await getUsers(); // Fetch users from JSON-Server
    const foundUser = users.find(
      (user: { id: string }) => user.id === parsedUser.id
    );

    return !!foundUser; // return true if exist and false if it doesn't
  } catch (error) {
    console.error("error checking user login:", error);
    return false;
  }
};
