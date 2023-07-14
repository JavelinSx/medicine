import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";

const USER_CREATE_FETCH = 'create/user'
const USER_HELP_FETCH = 'help/user'
const MESSAGE_HELP_FETCH = 'message/user'
const DELETE_MESSAGE_HELP_FETCH = 'delete/message'


const initialState = {
    createdUser: null,
    loadingPost: false,
    errorPost: null,
    doctorsHelp: [],
}

export const fetchCreateUser = createAsyncThunk(USER_CREATE_FETCH, async (data) => {
    return MainApi.createUser(data)
        .then((user) => user)
        .catch((err) => { throw err })
})

export const fetchHelp = createAsyncThunk(USER_HELP_FETCH, async (data) => {
    return MainApi.help(data)
        .then((data) => { console.log(data); return data })
        .catch((err) => { throw err })
})

export const fetchHelpMessage = createAsyncThunk(MESSAGE_HELP_FETCH, async (data) => {
    return MainApi.helpMessage(data)
        .then((data) => data)
        .catch((err) => { throw err })
})

export const fetchDeleteHelpMessage = createAsyncThunk(DELETE_MESSAGE_HELP_FETCH, async (data) => {
    return MainApi.deleteHelpMessage(data)
        .then((data) => data)
        .catch((err) => { throw err })
})



const usersPost = createSlice({
    name: 'usersPost',
    initialState,
    reducers: {},
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
            //fetchHelp
            .addCase(fetchHelp.pending, (state, action) => {
                state.loadingPost = true
            })
            .addCase(fetchHelp.fulfilled, (state, action) => {
                state.doctorsHelp = action.payload.doctor;
                state.loadingPost = false;
                state.errorPost = null
            })
            .addCase(fetchHelp.rejected, (state, action) => {
                state.errorPost = action.error.message;
                state.loadingPost = false;
            })

    }
})

export default usersPost.reducer