import axios from "axios";

// export const isUserLoggedIn = async (): Promise<boolean> => {
//   const storedUser =
//     localStorage.getItem("user") || sessionStorage.getItem("user");

//   if (!storedUser) {
//     return false;
//   }

//   try {
//     const parsedUser = JSON.parse(storedUser);
//     const users = await getUsers(); // Fetch users from JSON-Server
//     const foundUser = users.find(
//       (user: { id: string }) => user.id === parsedUser.id
//     );

//     return !!foundUser; // return true if exist and false if it doesn't
//   } catch (error) {
//     console.error("error checking user login:", error);
//     return false;
//   }
// };

const BASE_URL = "http://localhost:8000";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      throw new Error("Invalid credentials"); // Explicitly throw error for 401
    }
    throw err; // Rethrow other errors
  }
};

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
