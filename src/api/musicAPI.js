import axios from "axios";
import {
  API_BASE_URL_GLOBAL,
  API_BASE_URL_LOCAL,
  ACCESS_TOKEN,
} from "../constants/index";

const request = async (
  method = "get",
  urlEndPoint = API_BASE_URL_GLOBAL,
  data = {},
  customHeaders = {}
) => {
  try {
    const response = await axios({
      method: method,
      url: `${API_BASE_URL_GLOBAL}${urlEndPoint}`,
      data: data,
    });
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};

export const musicAPI = {
  async getAllSongs() {
    return await request("get", `/audio/getAllSongs`);
  },
};
