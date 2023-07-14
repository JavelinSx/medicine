import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    popupState: false,
    isOpen: false,
    text: '',
    purpose: null,
    user: null,
    cardId: null,
}


const popupInteractionUser = createSlice({
    name: 'popupConfirm',
    initialState,
    reducers: {
        dismissPopup: (state) => {
            state.popupState = false;
            state.isOpen = false
            state.text = ''
            state.purpose = null
        },
        openPopup: (state, action) => {
            state.isOpen = true
            state.purpose = action.payload.purpose
            state.text = action.payload.text
            state.popupState = false;
            state.user = action.payload.user
            state.cardId = action.payload.cardId
        }
    },
})

export const { dismissPopup, openPopup } = popupInteractionUser.actions;
export default popupInteractionUser.reducer