import React, { useState } from "react";
import { registerHelper } from "../UserFunction";
import { useHistory, useLocation } from "react-router-dom";
import { Input, Button, Card, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({ email: "", password: "" });
  const history = useHistory();
  const { state } = useLocation();

  const setUserField = (field, data) => {
    setRegisterInfo({ ...registerInfo, [field]: data });
  };

  const register = e => {
    e.preventDefault();
    registerHelper(registerInfo);
    history.push("/");
  };

  const goBack = () =>
    state ? history.push(state.prevURL) : history.push("/");

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      {
        <Button
          onClick={goBack}
          color="default"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-button"
        >
          Back
        </Button>
      }
      <Card className="login-card">
        <form
          className="form"
          onSubmit={register}
          style={{ textAlign: "center" }}
        >
          <Grid container className="email">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Input
                className="input"
                placeholder="Email"
                value={registerInfo.email}
                onChange={e => setUserField("email", e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container className="password">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Input
                className="input"
                placeholder="Password"
                value={registerInfo.password}
                type="password"
                onChange={e => setUserField("password", e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            className="login-button"
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default Register;
