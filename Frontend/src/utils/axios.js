import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://rebel-threads.vercel.app"
    : "http:192.168.0.93:8000";
export default axios.create({
  baseURL: url,
});
