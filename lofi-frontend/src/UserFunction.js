import axios from "axios";

const serverUrl = "http://localhost:5000";
export const registerHelper = newUser => {
  return axios
    .post(`${serverUrl}/users/register`, {
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered");
    });
};

export const loginHelper = user => {
  console.log("This is the submitted loginInfo to loginHelper", user);
  return axios
    .post(`${serverUrl}/users/login`, {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log("This is response", response);
      if (!response.data.error) {
        localStorage.setItem("usertoken", response.data.token);
        return {
          token: response.data.token,
          favoriteChords: response.data.favoriteChords
        };
      } else {
        console.log("This is failed response", response.data);
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
