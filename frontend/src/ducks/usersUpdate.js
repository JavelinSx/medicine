import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";

const USER_UPDATE_FETCH = 'update/user'

const initialState = {
    updatedUser: null,
    loadingUpdate: false,
    errorUpdate: null,
}

export const fetchUpdateUser = createAsyncThunk(USER_UPDATE_FETCH, async(data) => {
    console.log(data)
    return await MainApi.updateUser(data)
        .then((user) => user)
        .catch((err) => {throw err})
})


const usersUpdate = createSlice({
    name: 'usersUpdate',
    initialState,
    reducers:{
        setUserUpdated: (state, action) => {
            state.updatedUser = action.payload
        }
    },
    extraReducers: builder => {
        builder
        //fetchCreatePatient
            .addCase(fetchUpdateUser.pending, (state, action) => {
                console.log(action.payload)
                state.loadingUpdate = true
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.updatedUser = action.payload;
                state.loadingUpdate = false;
            })
            .addCase(fetchUpdateUser.rejected, (state, action) => {
                console.log(action)
                state.errorUpdate = action.payload;
                state.loadingUpdate = false;
            })      
    }
})
export const {setUserUpdated} = usersUpdate.actions
export default usersUpdate.reducer