import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";

const USER_CREATE_FETCH = 'create'

const initialState = {
    createdUser: null,
    loadingPost: false,
    errorPost: null,
}

export const fetchCreateUser = createAsyncThunk(USER_CREATE_FETCH, async(data) => {
    return MainApi.createUser(data)
        .then((user) => user)
        .catch((err) => {throw err})
})

const usersPost = createSlice({
    name: 'usersPost',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        //fetchCreatePatient
            .addCase(fetchCreateUser.pending, (state, action) => {
                state.loadingPost = true
            })
            .addCase(fetchCreateUser.fulfilled, (state, action) => {
                state.createdUser = action.payload;
                state.loadingPost = false;
                state.errorPost = null
            })
            .addCase(fetchCreateUser.rejected, (state, action) => {
                state.errorPost = action.error.message;
                state.loadingPost = false;
            })
    }
})

export default usersPost.reducer