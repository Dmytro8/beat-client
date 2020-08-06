import axios from "axios";
import {
  API_BASE_URL_GLOBAL,
  API_BASE_URL_LOCAL,
  ACCESS_TOKEN,
} from "../constants/index";
import { MethodType } from "../types/axios";

const request = async (
  method: MethodType = "get",
  urlEndPoint: string = API_BASE_URL_GLOBAL,
  data: object = {},
  customHeaders: object = {}
) => {
  try {
    const response = await axios({
      method: method,
      url: `${API_BASE_URL_GLOBAL}${urlEndPoint}`,
      data: data,
    });
    return response.data;
  } catch (error) {
    if (error.message === "Network Error") return { status: 500 };
    else return error.response.status;
  }
};

export const musicAPI = {
  async getAllSongs() {
    return await request("get", `/audio/getAllSongs`)
      .then((response) => response)
      .catch((error) => error.response);
  },
  async checkIsSongImgExist(imgUrl: string) {
    return await request("get", `/audio/getAudioImage${imgUrl}`)
      .then((response) => response)
      .catch((error) => error.response);
  },
};
