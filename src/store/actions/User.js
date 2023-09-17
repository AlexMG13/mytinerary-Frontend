import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const sign_in = createAsyncThunk("sign_in", async (payload) => {
  try {
    let { email, password } = payload;
    const user = await axios
      .post("http://localhost:3030/api/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        Swal.fire({
          icon: "success",
          title: "Sign In correctly",
        });
        return response.data;
      })
      .catch((error) => {
        let errorMesage = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Could not been logged",
          text: errorMesage,
        });
      });
    return { user: user };
  } catch (error) {
    console.log(error);
  }
});

const authenticate = createAsyncThunk("authenticate", async () => {
  try {
    let token = localStorage.getItem("token");
    const user = await axios
      .post("http://localhost:3030/api/user/authenticated", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        return response.data.user;
      });
    return {
      user: user,
    };
  } catch (error) {
    console.log(error.message);
  }
});

const sign_out = createAsyncThunk("sign_out", async () => {
  try {
    axios.post("http://localhost:3030/api/user/signout").then(() => {
      localStorage.removeItem("token");
    });
  } catch (error) {
    console.log(error);
  }
});

export const sign_up = createAsyncThunk("sign_up", async (obj) => {
  try {
    const user = await axios
      .post("http://localhost:3030/api/user/register", obj)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: "User created!",
          footer: '<a href="/">Press to go Home Page!</a>',
        });
      })
      .catch((error) => {
        let errorMesage = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Could not been created",
          text: errorMesage,
        });
      });
    return user.data;
  } catch (error) {
    console.log(error);
  }
});

const userActions = {
  sign_in,
  authenticate,
  sign_out,
  sign_up,
};

export default userActions;
