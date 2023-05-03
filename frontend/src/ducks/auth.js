import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";
import {
  setIsAuthenticated,
  getIsAuthenticated,
  setUser,
  getUser
} from '../utils/localStorageInfo'
// Constants
const LOGIN_FETCH = 'auth/fetchLogin'
const AUTH_FETCH = 'auth/fetchCookie'
const LOGOUT_FETCH = 'auth/fetchLogout'

// Initial State
const initialState = {
  user: getUser,
  userAuth: null,
  isAuthenticated: getIsAuthenticated || false,
  loadingAuth: false,
  errorAuth: null,
};

export const fetchAuth = createAsyncThunk(LOGIN_FETCH, async (data, thunkAPI) => {
  return await MainApi.login(data)
    .then((user) => user)
    .catch((err) => thunkAPI.rejectWithValue(err.message))
  
})

export const fetchCookie = createAsyncThunk(AUTH_FETCH, async (data, thunkAPI) => {
 return await MainApi.getUser(data)
  .then((data)=> data)
  .catch((err)=> thunkAPI.rejectWithValue(err.message))
})

export const fetchLogout = createAsyncThunk(LOGOUT_FETCH, async (_, thunkAPI) => {
  return await MainApi.logout()
    .then(() => localStorage.clear())
    .catch((err) => thunkAPI.rejectWithValue(err.message))
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
    //fetchAuth
            .addCase(fetchAuth.pending, (state, action) => {
              state.loadingAuth = true
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
              state.user = action.payload;
              state.loadingAuth = false;
              state.isAuthenticated = true;
              state.errorAuth = null
              setUser(action.payload)
              setIsAuthenticated(true)
            })
            .addCase(fetchAuth.rejected, (state, action) => {
              state.error = action.error.message;
              state.loadingAuth = false;
              state.isAuthenticated = false;
            })
    //fetchCookie
            .addCase(fetchCookie.pending, (state, action) => {
              state.loadingAuth = true
              state.isAuthenticated = false;
            })
            .addCase(fetchCookie.fulfilled, (state, action) => {
              state.user = action.payload;
              state.loadingAuth = false;
              state.isAuthenticated = true;
              state.errorAuth = null
              setUser(action.payload)
              setIsAuthenticated(true)
            })
            .addCase(fetchCookie.rejected, (state, action) => {
              state.error = action.payload;
              state.loadingAuth = false;
              state.isAuthenticated = false;
            })
    //fetchLogout
            .addCase(fetchLogout.pending, (state, action) => {
              state.loadingAuth = true
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
              state.user = null;
              state.loadingAuth = false;
              state.isAuthenticated = false;
              state.errorAuth = null
              localStorage.clear()
            })
            .addCase(fetchLogout.rejected, (state, action) => {
              state.error = action.error.message;
              state.loadingAuth = false;
              state.isAuthenticated = false;
    })
  }
})

export default authSlice.reducer