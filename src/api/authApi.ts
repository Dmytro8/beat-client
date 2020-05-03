import axios from "axios";

const instance = axios.create({
  //for Local Development
  baseURL: "http://localhost:8080",
  //using API from Heroku
  // baseURL: "https://herokuproject.herokuapp.com/auth",
});

export const authAPI = {
  auth(username = "", password = "") {
    return instance
      .post(`auth?username=${username}&password=${password}`, {
        username,
        password,
      })
      .then((response: any) => {
        return response;
      });
  },
  login() {
    return instance.get("/login").then((response: any) => {
      return response.data;
    });
  },
  logout() {
    return instance.put("/logout").then((response: any) => {
      return response.data;
    });
  },
};
