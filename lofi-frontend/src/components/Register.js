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
    history.push("/login");
  };

  const goBack = () =>
    state ? history.push(state.prevURL) : history.push("/");

  return (
    <div>
      <Button
        onClick={goBack}
        color="primary"
        variant="contained"
        style={{ margin: "10px" }}
        startIcon={<ArrowBackIcon />}
        className="back-button"
      >
        Back
      </Button>
      <form
        className="form"
        onSubmit={register}
        style={{
          backgroundColor: "#dbb2a6",
          textAlign: "center",
          width: "500px",
          margin: "0 auto",
          marginTop: "80px",
          padding: "30px",
          paddingTop: "10px",
          borderRadius: "30px",
          borderStyle: "solid",
          borderColor: "#a35946",
          borderWidth: "5px"
        }}
      >
        <h1>Register</h1>
        <Grid container className="email">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Input
              className="input"
              placeholder="Email"
              value={registerInfo.email}
              onChange={e => setUserField("email", e.target.value)}
              style={{ width: "400px" }}
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
              style={{ width: "400px", marginTop: "20px" }}
            />
          </Grid>
        </Grid>
        <Button
          className="login-button"
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "30px", width: "100px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
