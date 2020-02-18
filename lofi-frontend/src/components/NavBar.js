import React from "react";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const redTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#d85ad8"
    }
  }
});

function NavBar() {
  return (
    <MuiThemeProvider theme={redTheme}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ float: "right", marginRight: 20, marginTop: 5 }}
      >
        Login
      </Button>
    </MuiThemeProvider>
  );
}
export default NavBar;
