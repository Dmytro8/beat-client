import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { SignupSchema } from "../FormValidation";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";

import { StyledTextField, StyledButton } from "../../common/FormControls";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import {
  updateAuthentication,
  updateToken,
} from "../../../contexts/AuthContext/actions";
import { authAPI } from "../../../api/authApi";
import { CONFIRM_EMAIL } from "../../../constants/route.urls";
import { useHistory } from "react-router-dom";

import { useQuery } from "react-query";
import { ButtonSpinner } from "../../common/Spinner";

const RegistrationForm = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, control, errors } = useForm({
    validationSchema: SignupSchema,
  });
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [username, setUsername] = useState("");
  const [isUsernameExist, setIsUsernameExist] = useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      // maybe receiving token in sign up query is not important, it will be important after confirmed email
      setIsLoading(true);
      const response = await authAPI.signup(data);
      setIsLoading(false);
      //await dispatch(updateAuthentication(!!response.data.accessToken));
      //await dispatch(updateToken(response.data.accessToken));
      if (response.status === 400) {
        setError(response.data.message);
      } else {
        history.replace(CONFIRM_EMAIL);
      }
    } catch (e) {}
  };

  return (
    <form
      id="signup"
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid" }}
    >
      <Grid container alignItems="flex-end">
        <Grid item style={{ width: "100%" }}>
          {errors.username ? (
            <Controller
              error
              as={StyledTextField}
              style={{ width: "100%" }}
              name="username"
              label="Username"
              control={control}
              value={username}
              onChange={([event]) => {
                setUsername(event.target.value);
                return event;
              }}
              defaultValue=""
              helperText={errors.username ? errors.username.message : null}
            />
          ) : (
            <Controller
              as={StyledTextField}
              style={{ width: "100%" }}
              name="username"
              label="Username"
              control={control}
              value={username}
              onChange={([event]) => {
                setUsername(event.target.value);
                return event;
              }}
              defaultValue=""
              helperText={
                isUsernameExist ? (
                  <p style={{ color: "#f44336" }}>
                    That username is taken. Try another.
                  </p>
                ) : null
              }
            />
          )}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item style={{ width: "100%" }}>
          {errors.email ? (
            <Controller
              error
              as={StyledTextField}
              style={{ width: "100%" }}
              name="email"
              label="Email"
              control={control}
              defaultValue=""
              helperText={errors.email ? errors.email.message : null}
            />
          ) : (
            <Controller
              as={StyledTextField}
              style={{ width: "100%" }}
              name="email"
              label="Email"
              control={control}
              defaultValue=""
            />
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item style={{ width: "100%" }}>
          {errors.password ? (
            <Controller
              error
              as={StyledTextField}
              style={{ width: "100%" }}
              name="password"
              id="password"
              type={values.showPassword ? "text" : "password"}
              label="Password"
              control={control}
              helperText={errors.password ? errors.password.message : null}
              defaultValue=""
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <Controller
              as={StyledTextField}
              style={{ width: "100%" }}
              name="password"
              id="password"
              type={values.showPassword ? "text" : "password"}
              label="Password"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Grid>
      </Grid>
      <p style={{ color: "#ed4337" }}>{error}</p>
      <StyledButton variant="contained" type="submit">
        {isLoading ? <ButtonSpinner /> : "Sign Up"}
      </StyledButton>
    </form>
  );
};

export default RegistrationForm;
