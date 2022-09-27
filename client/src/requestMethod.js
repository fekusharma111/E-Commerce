import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:5000/api";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjVjYjEwNmQzZDljMDI5Mjc3NTBhZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Mzk1Mzc1MiwiZXhwIjoxNjY0MDQwMTUyfQ.KQRKdw5XY7JuB_cZjyDyAsGI-TpHZjfMyVFENi1hhek";
const TOKEN = currentUser;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
