import axios from "axios";
import {
  API_BASE_URL_GLOBAL,
  API_BASE_URL_LOCAL,
  ACCESS_TOKEN,
} from "../constants/index";

type MethodType =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK"
  | undefined;
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
    return await request("get", `/audio/getAllSongs`);
  },
};
