import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";

const USER_UPDATE_FETCH = 'update/user'
const PASSWORD_UPDATE_FETCH = 'update/password'


const initialState = {
    updatedUser: null,
    updatedCard: null,
    loadingUpdate: false,
    errorUpdate: null,
    helpPopup: false,

}

export const fetchUpdateUser = createAsyncThunk(USER_UPDATE_FETCH, async (data) => {
    return await MainApi.updateUser(data)
        .then((user) => user)
        .catch((err) => { throw err })
})

export const fetchChangePassword = createAsyncThunk(PASSWORD_UPDATE_FETCH, async (data) => {
    return await MainApi.changePassword(data)
        .then((user) => user)
        .catch((err) => { throw err })
})

const usersUpdate = createSlice({
    name: 'usersUpdate',
    initialState,
    reducers: {
        setUserUpdated: (state, action) => {
            state.updatedUser = action.payload
        },
        openHelpPopup: (state, action) => {
            state.helpPopup = action.payload
        }
    },
    extraReducers: builder => {
        builder
            //fetchCreatePatient
            .addCase(fetchUpdateUser.pending, (state, action) => {
                state.loadingUpdate = true
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.updatedUser = action.payload;
                state.loadingUpdate = false;
            })
            .addCase(fetchUpdateUser.rejected, (state, action) => {
                state.errorUpdate = action.payload;
                state.loadingUpdate = false;
            })
    }
})
export const { setUserUpdated, openHelpPopup } = usersUpdate.actions
export default usersUpdate.reducer