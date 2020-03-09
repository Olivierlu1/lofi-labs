import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = ({ currUser, setCurrUser }) => {
  const history = useHistory();

  const logOut = e => {
    e.preventDefault();
    localStorage.clear();
    setCurrUser({});
    history.push("/");
  };

  const nonUserHeader = () => {
    return (
      <div>
        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ float: "right", marginRight: 20, marginTop: 10 }}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{
              float: "right",
              marginRight: 20,
              marginTop: 10
            }}
          >
            Register
          </Button>
        </Link>
      </div>
    );
  };

  const userHeader = currUser => {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginRight: 20, marginLeft: 10, marginTop: 10 }}
        >{`Hello ${currUser.email}`}</Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ float: "right", marginRight: 10, marginTop: 10 }}
          onClick={logOut}
        >
          Logout
        </Button>
      </div>
    );
  };

  return Object.entries(currUser).length
    ? userHeader(currUser)
    : nonUserHeader();
};
export default NavBar;
