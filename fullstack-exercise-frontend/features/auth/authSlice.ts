import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../common/axios";
import { LoginInputs } from "../../pages/admin/login";
import { Status } from "../../types/status";
import { getCookie } from "cookies-next";

type AuthState = {
  loggedIn: boolean;
  status: Status;
};

const loggedInFunction = () => {
  return !!getCookie("logged-in");
};

const initialState: AuthState = {
  loggedIn: loggedInFunction(),
  status: Status.Idle,
};

export const login = createAsyncThunk("auth/login", async (data: LoginInputs) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = Status.Success;
        const loggedIn = getCookie("logged-in");
        if (loggedIn == true) {
          state.loggedIn = true;
        } else {
          state.loggedIn = false;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = Status.Fail;
      })

      .addCase(logout.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = Status.Success;
        const loggedIn = getCookie("logged-in");
        if (loggedIn == true) {
          state.loggedIn = true;
        } else {
          state.loggedIn = false;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = Status.Fail;
      });
  },
});

// export const {  } = authSlice.actions;

export default authSlice.reducer;