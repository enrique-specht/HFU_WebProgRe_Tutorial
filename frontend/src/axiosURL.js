import axios from "axios";

const config = {
  baseURL: "http://localhost:3100",
};

const instance = axios.create(config);

export default instance;
