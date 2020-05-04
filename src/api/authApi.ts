import axios from "axios";
import { API_BASE_URL_GLOBAL, ACCESS_TOKEN } from "./../constants/index";

const instance = axios.create({
  baseURL: `${API_BASE_URL_GLOBAL}`,
  // headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
});

export const authAPI = {
  async login(usernameOrEmail = "", password = "") {
    const response = await instance.post(`/auth/login`, {
      usernameOrEmail,
      password,
    });
    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
    return response;
  },
  async getCurrentUser(accessToken: string | null) {
    const response = await instance.get(`/user/me`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response;
  },
  // login() {
  //   return instance.get("/login").then((response: any) => {
  //     return response.data;
  //   });
  // },
  // logout() {
  //   return instance.put("/logout").then((response: any) => {
  //     return response.data;
  //   });
  // },
};
