import axios from "axios";

const baseURL = "http://localhost:5000";
const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("profile");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

// Authenticating User
export const signIn = (formData) => API.post("user/signin", formData);
export const signUp = (formData) => API.post("user/signup", formData);
