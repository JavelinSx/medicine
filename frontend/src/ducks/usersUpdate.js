import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";

const USER_UPDATE_FETCH = 'update/user'
const CARD_UPDATE_FETCH = 'update/card'

const initialState = {
    updatedUser: null,
    updatedCard: null,
    loadingUpdate: false,
    errorUpdate: null,
}

export const fetchUpdateUser = createAsyncThunk(USER_UPDATE_FETCH, async(data) => {
    return await MainApi.updateUser(data)
        .then((user) => user)
        .catch((err) => {throw err})
})

export const fetchUpdateCard = createAsyncThunk(CARD_UPDATE_FETCH, async(data) => {
    return await MainApi.updateCard(data)
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
            .addCase(fetchUpdateCard.pending, (state, action) => {
                state.loadingUpdate = true
            })
            .addCase(fetchUpdateCard.fulfilled, (state, action) => {
                state.updatedCard = action.payload;
                state.loadingUpdate = false;
            })
            .addCase(fetchUpdateCard.rejected, (state, action) => {
                state.errorUpdate = action.payload;
                state.loadingUpdate = false;
            })     
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
export const {setUserUpdated} = usersUpdate.actions
export default usersUpdate.reducer