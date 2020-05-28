import axios from "axios";
import {
  API_BASE_URL_GLOBAL,
  API_BASE_URL_LOCAL,
  ACCESS_TOKEN,
} from "../constants/index";

const request = (
  method = "get",
  urlEndPoint = API_BASE_URL_GLOBAL,
  data = {},
  customHeaders = {}
) => {
  return axios({
    method: method,
    url: `${API_BASE_URL_GLOBAL}${urlEndPoint}`,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      ...customHeaders,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.status;
    });
};

export const musicAPI = {
  async getAllSongs() {
    return await request("get", `/audio/getAllSongs`);
  },
};
