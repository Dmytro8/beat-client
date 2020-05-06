import * as yup from "yup";

const AtLeastOneLowercaseAlphabetical = "(?=.*[a-z])";
const AtLeastOneUppercaseAlphabetical = "(?=.*[A-Z])";
const AtLeastOneNumeric = "(?=.*[0-9])";
const AtLeastOneSpecial = "(?=.*[!@#$%^&*])";
const MustBeEightOrLonger = "(?=.{8,})";

const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const validPasswordRegex = new RegExp(
  `${AtLeastOneLowercaseAlphabetical}${AtLeastOneUppercaseAlphabetical}${AtLeastOneNumeric}`
);
<<<<<<< HEAD
const validUsernameRegex = /^[a-z0-9]+([._]?[a-z0-9]+)*$/;

export const LoginSchema = yup.object().shape({
  email: yup.string().required("email or username is a required field"),
  //   .matches(validEmailRegex, "enter a valid email"),
  password: yup
    .string()
    .required("password is a required field")
    .min(8)
    .matches(
      validPasswordRegex,
      "password must match at least one lowercase, one uppercase and one numeric character"
    ),
});

export const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is a required field")
    .min(2)
    .matches(
      validUsernameRegex,
      "username must match only lowercase, digits, underscore and dot. \
      Underscore and dot can't be next to each other and at the end or start of a username"
    ),
  // .matches(validUsernameRegex, "name must match only alphabetical character"),
  // surname: yup
  //   .string()
  //   .required("username is a required field")
  //   .min(2)
  //   .matches(
  //     validUsernameRegex,
  //     "surname must match only alphabetical character"
  //   ),
=======
const validUsernameRegex = /^[a-zA-Z]{2,}$/;

export const LoginSchema = yup.object().shape({
>>>>>>> 0b9ccaf9198a3634340cc8c0fc0a9ef1953c498e
  email: yup
    .string()
    .required("email is a required field")
    .matches(validEmailRegex, "enter a valid email"),
  password: yup
    .string()
    .required("password is a required field")
    .min(8)
    .matches(
      validPasswordRegex,
      "password must match at least one lowercase, one uppercase and one numeric character"
    ),
});
