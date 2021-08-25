import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER || "http://localhost:5000";
const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("ToDo-App-profile");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

// Authenticating User
export const signIn = (formData) => API.post("user/signin", formData);
export const signUp = (formData) => API.post("user/signup", formData);
export const reValidate = (formData) => API.post("user/revalidate", formData);
export const updateUser = (formData) => API.patch("user/updateuser", formData);
