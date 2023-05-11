import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    listStatePatient: false,
    listStateDoctor: false,
    listStateRegistrar: false,
    listStateNurse: false
}


const listState = createSlice({
    name: 'listState',
    initialState,
    reducers:{
        toggleStatePatient: (state, action) => {
            state.listStatePatient=!state.listStatePatient;
            state.listStateDoctor=false;
            state.listStateNurse=false;
            state.listStateRegistrar=false;
        },
        toggleStateDoctor: (state, action) => {
            state.listStatePatient=false;
            state.listStateDoctor=!state.listStateDoctor;
            state.listStateNurse=false;
            state.listStateRegistrar=false;
        },
        toggleStateRegistrar: (state, action) => {
            state.listStatePatient=false;
            state.listStateDoctor=false;
            state.listStateNurse=false;
            state.listStateRegistrar=!state.listStateRegistrar;
        },
        toggleStateNurse: (state, action) => {
            state.listStatePatient=false;
            state.listStateDoctor=false;
            state.listStateNurse=!state.listStateNurse;
            state.listStateRegistrar=false;
        }
    },
})

export const { toggleStateDoctor, toggleStateNurse, toggleStatePatient, toggleStateRegistrar } = listState.actions;
export default listState.reducer