import axios from "axios";
import {
  API_BASE_URL_GLOBAL,
  API_BASE_URL_LOCAL,
  ACCESS_TOKEN,
} from "../constants/index";

const instance = axios.create({
  // Global API
  baseURL: `${API_BASE_URL_GLOBAL}`,

  // Local API
  // baseURL: `${API_BASE_URL_LOCAL}`,
});

export const authAPI = {
  async getCurrentUser(accessToken: string) {
    const response = await instance.get(`/user/me`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response.data;
  },
  async checkUsername(username: string) {
    const response = await instance
      .get(`/auth/checkUsername?username=${username}`)
      .catch((error) => {
        return error;
      });
    return response;
  },
  async signup(user: object) {
    const response = await instance
      .post(`/auth/signup`, {
        ...user,
      })
      .catch((error) => {
        return error.response;
      });
    // localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
    return response;
  },
  async login(usernameOrEmail: string = "", password: string = "") {
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
  async activateEmail(activatonCode: string) {
    return await instance
      .get(`auth/activate?activationCode=${activatonCode}`)
      .then((response) => response)
      .catch((error) => error.response);
  },
  async logout(accessToken: string) {
    // const response = await instance.post(`/auth/logout`, {
    //   headers: { Authorization: "Bearer " + accessToken },
    // });
    localStorage.removeItem(ACCESS_TOKEN);
    // return response;
  },
};
