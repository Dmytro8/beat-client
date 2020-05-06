import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { LoginSchema } from "../FormValidation";
import classes from "./LoginForm.module.scss";
import { authAPI } from "../../../api/authApi";
import {
  StyledTextField,
  ButtonSpinner,
  StyledButton,
} from "../../common/FormControls";
import { AuthContext } from "../../../contexts/AuthContext/authContext";
import {
  updateAuthentication,
  updateToken,
  updateAuthorizing,
} from "../../../contexts/AuthContext/actions";

const LoginForm = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { handleSubmit, control, errors } = useForm({
    validationSchema: LoginSchema,
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
    const { email, password } = data;
    try {
      dispatch(updateAuthorizing(true));
      const response = await authAPI.login(email, password);
      await dispatch(updateAuthentication(!!response.data.accessToken));
      await dispatch(updateToken(response.data.accessToken));
    } catch (e) {
      // console.log(e.message);
    }
  };
  return (
    <form
      id="login"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.loginForm}
    >
      <Grid container alignItems="flex-end">
        {errors.email ? (
          <Grid
            item
            style={{ width: "10%", display: "grid", alignSelf: "center" }}
          >
            <EmailIcon style={{ color: "#f44336" }} />
          </Grid>
        ) : (
          <Grid item style={{ width: "10%" }}>
            <EmailIcon style={{ color: "#f26a6a" }} />
          </Grid>
        )}

        <Grid item style={{ width: "90%" }}>
          {errors.email ? (
            <>
              <Controller
                error
                as={StyledTextField}
                style={{ width: "100%" }}
                name="email"
                label="Email or Username"
                control={control}
                defaultValue=""
                helperText={errors.email ? errors.email.message : ""}
              />
            </>
          ) : (
            <Controller
              as={StyledTextField}
              style={{ width: "100%" }}
              name="email"
              label="Email or Username"
              control={control}
              defaultValue=""
            />
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        {errors.password ? (
          <Grid
            item
            style={{ width: "10%", display: "grid", alignSelf: "center" }}
          >
            <LockIcon
              style={{
                color: "#f44336",
              }}
            />
          </Grid>
        ) : (
          <Grid item style={{ width: "10%" }}>
            <LockIcon style={{ color: "#f26a6a" }} />
          </Grid>
        )}

        <Grid item style={{ width: "90%" }}>
          {errors.password ? (
            <Controller
              error
              label="Password"
              as={StyledTextField}
              style={{ width: "100%" }}
              name="password"
              type={values.showPassword ? "text" : "password"}
              control={control}
              defaultValue=""
              helperText={errors.password ? errors.password.message : ""}
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
              type={values.showPassword ? "text" : "password"}
              label="Password"
              control={control}
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
      <StyledButton
        type="submit"
        variant="contained"
        // disabled={loading}
      >
        {state.isAuthorizing ? <ButtonSpinner /> : "Login"}
      </StyledButton>
    </form>
  );
};

export default LoginForm;
