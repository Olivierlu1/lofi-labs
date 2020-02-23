import React from "react";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const redTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#d85ad8"
    }
  }
});

function NavBar({ currUser }) {
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
      </MuiThemeProvider>
    );
  };

  return currUser ? nonUserHeader : userHeader;
}
export default NavBar;
