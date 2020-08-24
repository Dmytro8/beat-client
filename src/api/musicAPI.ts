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
      headers: customHeaders,
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
  async deleteSong() {
    return await request("get", "/audio/delete")
      .then((response) => response)
      .catch((error) => error.response);
  },

  // get method to receive favourite songs
  async getFavourites(accessToken: string) {
    return await request(
      "get",
      "/like/getFavourites",
      {},
      { Authorization: "Bearer " + accessToken }
    )
      .then((response) => response)
      .catch((error) => error.response);
  },

  // put method to set like
  async setLike(accountId: number, songId: number, accessToken: string) {
    let payload = {
      account: { idaccount: String(accountId) },
      audio: { id: String(songId) },
    };
    return await request("put", "/like/setLike", payload, {
      Authorization: "Bearer " + accessToken,
    })
      .then((response) => response)
      .catch((error) => error.response);
  },

  // delete method to delete like
  async unlike(accountId: number, songId: number, accessToken: string) {
    let payload = {
      account: { idaccount: String(accountId) },
      audio: { id: String(songId) },
    };
    return await request("delete", "/like/unlike", payload, {
      Authorization: "Bearer " + accessToken,
    })
      .then((response) => response)
      .catch((error) => error.response);
  },
};
