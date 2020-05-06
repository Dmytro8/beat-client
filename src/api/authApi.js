import axios from "axios";
import { API_BASE_URL_GLOBAL, ACCESS_TOKEN } from "../constants/index";

const instance = axios.create({
  baseURL: `${API_BASE_URL_GLOBAL}`,
});

export const authAPI = {
  async getCurrentUser(accessToken) {
    const response = await instance.get(`/user/me`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response.data;
  },
  async checkUsername(username) {
    const response = await instance
      .get(`/auth/checkUsername?username=${username}`)
      .catch((error) => {
        return error;
      });
    return response;
  },
  async signup(user) {
    const response = await instance
      .post(`/auth/signup`, {
        ...user,
      })
      .catch((error) => {
        return error;
      });
    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
    return response;
  },
  async login(usernameOrEmail = "", password = "") {
    return await instance
      .post(`/auth/login`, {
        usernameOrEmail,
        password,
      })
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        return response;
      })
      .catch((error) => {
        return error.response.status;
      });
  },
  async logout(accessToken) {
    // const response = await instance.post(`/auth/logout`, {
    //   headers: { Authorization: "Bearer " + accessToken },
    // });
    localStorage.removeItem(ACCESS_TOKEN);
    // return response;
  },
};
