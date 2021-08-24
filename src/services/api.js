import axios from "axios";

export default axios.create({
  baseURL: "https://proxy-fabrica.herokuapp.com/",
});
