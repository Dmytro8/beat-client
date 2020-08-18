// Public routes
export const HOME = "/";
export const MUSIC = "/music";
export const ERROR = "/error";

// Private routes
export const BASKET = "/basket";
export const ABOUT = "/about";
export const ACCOUNT = "/account";
export const FAVOURITE_SONGS = "/favourite-songs";

//-- Account subpages WITHOUT admin previledges
export const GENERAL = "/general";
export const TEST = "/test";

//-- Account subpages WITH admin previledges
export const UPLOAD_SONG = "/upload-song";
export const SONGS = "/songs";

// Restricted routes (only without authentication)
export const REGISTRATION = "/signup";
export const OAUTH2_REDIRECT = "/oauth2/redirect";
export const CONFIRM_EMAIL = "/confirm-email";
export const CONFIRMED_EMAIL = "/confirmed-email";
