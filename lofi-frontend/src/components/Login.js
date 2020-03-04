import React, { useState } from "react";
import { loginHelper } from "../UserFunction";
import { useHistory, useLocation } from "react-router-dom";
import { Input, Button, Card, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
    <div>
      <Button
        onClick={goBack}
        color="primary"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        style={{ margin: "5px" }}
        className="back-button"
      >
        Back
      </Button>
      <form
        className="form"
        onSubmit={login}
        a
        style={{
          backgroundColor: "#dbb2a6",
          textAlign: "center",
          width: "500px",
          margin: "0 auto",
          marginTop: "80px",
          padding: "30px",
          paddingTop: "10px"
        }}
      >
        <h1>Login</h1>
        <Grid container className="email">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Input
              className="input"
              placeholder="Email"
              value={loginInfo.email}
              color="primary"
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
              value={loginInfo.password}
              type="password"
              color="primary"
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

export default Login;
