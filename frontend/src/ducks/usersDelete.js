import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";

const PATIENT_DELETE_FETCH = 'create/patient'
const DOCTOR_UPDATE_FETCH = 'create/doctor'
const ADMIN_UPDATE_FETCH = 'create/admin'
const REGISTRAR_UPDATE_FETCH = 'create/registrar'
const NURSE_UPDATE_FETCH = 'create/nurse'

const initialState = {
    deletedUser: null,
    loading: false,
    errorDelete: null,
}

export const fetchDeletePatient = createAsyncThunk(PATIENT_DELETE_FETCH, async(data) => {
    return await MainApi.deleteUser(data)
        .then((user) => user)
        .catch((err) => {throw err})
})


const usersDelete = createSlice({
    name: 'usersUpdate',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        //fetchCreatePatient
            .addCase(fetchDeletePatient.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchDeletePatient.fulfilled, (state, action) => {
                state.deletedUser = action.payload;
                state.loading = false;
            })
            .addCase(fetchDeletePatient.rejected, (state, action) => {
                state.errorDelete = action.error;
                state.loading = false;
            })      
    }
})

export default usersDelete.reducer