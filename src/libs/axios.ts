import axios from "axios";

export const api = axios.create({
   baseURL: "https://todo-db.vercel.app",
});
