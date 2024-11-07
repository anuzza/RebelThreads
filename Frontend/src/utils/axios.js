import axios from "axios";

// const url = "http:172.24.144.213:8000";
const url = "http:192.168.0.93:8000";
export default axios.create({
  baseURL: url,
});
