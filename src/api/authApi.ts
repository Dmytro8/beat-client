import axios from "axios";
import { API_BASE_URL_GLOBAL, ACCESS_TOKEN } from "./../constants/index";

const instance = axios.create({
  baseURL: `${API_BASE_URL_GLOBAL}`,
});

export const authAPI = {
  async getCurrentUser(accessToken: string | null) {
    const response = await instance.get(`/user/me`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response.data;
  },
  async signup(user: {}) {
    const response = await instance.post(`/auth/signup`, {
      ...user,
    });
    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
    return response;
  },
  async login(usernameOrEmail = "", password = "") {
    const response = await instance.post(`/auth/login`, {
      usernameOrEmail,
      password,
    });
    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
    return response;
  },
  async logout(accessToken: string | null) {
    const response = await instance.post(`/auth/logout`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    localStorage.removeItem(ACCESS_TOKEN);
    return response;
  },
};
