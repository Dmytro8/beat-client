import React, { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { SignupSchema } from "../FormValidation";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";

import { StyledTextField, StyledButton } from "../../common/FormControls";
import { AuthContext } from "../../../contexts/AuthContext/authContext";
import {
  updateAuthentication,
  updateToken,
} from "../../../contexts/AuthContext/actions";
import { authAPI } from "../../../api/authApi";

const RegistrationForm = () => {
  const [state, dispatch] = useContext(AuthContext);
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

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // const response = await authAPI.signup(data);
      // await dispatch(updateAuthentication(!!response.data.accessToken));
      // await dispatch(updateToken(response.data.accessToken));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form
      id="signup"
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid" }}
    >
      <Grid container alignItems="flex-end">
        <Grid item style={{ width: "100%" }}>
          {errors.name ? (
            <Controller
              error
              as={StyledTextField}
              style={{ width: "100%" }}
              name="name"
              label="Name"
              control={control}
              defaultValue=""
              helperText={errors.name ? errors.name.message : null}
            />
          ) : (
            <Controller
              as={StyledTextField}
              style={{ width: "100%" }}
              name="name"
              label="Name"
              control={control}
              defaultValue=""
            />
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item style={{ width: "100%" }}>
          {errors.surname ? (
            <Controller
              error
              as={StyledTextField}
              style={{ width: "100%" }}
              name="surname"
              label="Surname"
              control={control}
              defaultValue=""
              helperText={errors.surname ? errors.surname.message : null}
            />
          ) : (
            <Controller
              as={StyledTextField}
              style={{ width: "100%" }}
              name="surname"
              label="Surname"
              control={control}
              defaultValue=""
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
      <StyledButton variant="contained" type="submit">
        Sign Up
      </StyledButton>
    </form>
  );
};

export default RegistrationForm;
