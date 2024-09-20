import axios from "axios";

const url = "http:192.168.0.94:8000";
export default axios.create({
  baseURL: url,
});
