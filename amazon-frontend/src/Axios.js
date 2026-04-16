import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-clonee-18xq.onrender.com"
});

export default instance;