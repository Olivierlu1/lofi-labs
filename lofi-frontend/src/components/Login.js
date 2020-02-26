import React, { useState } from "react";
import { loginHelper } from "../UserFunction";
import { useHistory, useLocation } from "react-router-dom";
import { Input, Button, Card, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Login = ({ setCurrUser }) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const history = useHistory();
  const { state } = useLocation();

  const setUserField = (field, data) => {
    if (Object.entries(loginInfo).length) {
      console.log(loginInfo);
      setLoginInfo({ ...loginInfo, [field]: data });
    }
  };

  const login = async e => {
    e.preventDefault();
    const result = await loginHelper(loginInfo);
    console.log("This is the result ", result);
    if (!result.error) {
      loginInfo.favoriteChords = result.favoriteChords;
      setCurrUser(loginInfo);
      history.push("/");
    } else {
      alert("Wrong info: Try out a different username / password");
      setCurrUser({});
    }
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
      <Card
        className="login-card"
        style={{ background: "none", width: "400px", margin: "0 auto" }}
      >
        <form
          className="form"
          onSubmit={login}
          a
          style={{ textAlign: "center" }}
        >
          <Grid container className="email">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Input
                className="input"
                placeholder="Email"
                value={loginInfo.email}
                onChange={e => setUserField("email", e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container className="password">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Input
                className="input"
                placeholder="Password"
                value={loginInfo.password}
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
            Login
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default Login;
