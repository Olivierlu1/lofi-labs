import React from "react";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const redTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#d85ad8"
    }
  }
});

const NavBar = ({ currUser, setCurrUser }) => {
  const history = useHistory();

  const logOut = e => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    setCurrUser({});
    history.push("/");
  };

  const nonUserHeader = () => {
    return (
      <MuiThemeProvider theme={redTheme}>
        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ float: "right", marginRight: 20, marginTop: 5 }}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ float: "right", marginRight: 20, marginTop: 5 }}
          >
            Register
          </Button>
        </Link>
      </MuiThemeProvider>
    );
  };

  const userHeader = currUser => {
    return (
      <MuiThemeProvider theme={redTheme}>
        <Button
          variant="contained"
          color="primary"
          size="large"
        >{`Hello ${currUser.email}`}</Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={logOut}
        >
          Logout
        </Button>
      </MuiThemeProvider>
    );
  };

  return Object.entries(currUser).length
    ? userHeader(currUser)
    : nonUserHeader();
};
export default NavBar;
