import axios from "axios";

//use vercel url in prod and ip address during development
const url =
  process.env.NODE_ENV === "production"
    ? "https://rebel-threads.vercel.app"
    : "http:192.168.0.93:8000";
export default axios.create({
  baseURL: url,
});
