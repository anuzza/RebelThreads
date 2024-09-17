import axios from "axios";

const url = "http://localhost:5001";
export default axios.create({
  baseURL: url,
});
