export const API_BASE_URL_LOCAL = "http://localhost:8080";
export const API_BASE_URL_GLOBAL = "https://beatstart.herokuapp.com";
export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_LOCAL = "http://localhost:3000/oauth2/redirect";
export const OAUTH2_REDIRECT_GLOBAL =
  "https://dev-beat.web.app/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  API_BASE_URL_GLOBAL +
  "/oauth2/authorize/google?redirect_uri=" +
  OAUTH2_REDIRECT_GLOBAL;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL_GLOBAL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_GLOBAL;

export const AUDIO_SERVER = "https://beatstart.herokuapp.com/audio/stream";
export const AUDIO_IMAGE_SERVER =
  "https://beatstart.herokuapp.com/audio/getAudioImage";
