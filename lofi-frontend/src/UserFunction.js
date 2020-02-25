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
  return axios
    .post(`${serverUrl}/users/login`, {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (typeof response.data["token"] !== undefined) {
        localStorage.setItem("usertoken", response.data.token);
        return response.data.token;
      } else {
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
    });
};
