import { createSlice } from "@reduxjs/toolkit";
import {getCard} from '../utils/sessionStorageInfo'

const initialState = {
    card: getCard || {},
    selectedCard: null
}


const card = createSlice({
    name: 'card',
    initialState,
    reducers:{
        selectCard: (state, action) => {
            const cardId = action.payload[0]._id
            state.card = action.payload[0]
            state.selectedCard = state.selectedCard === cardId ? null : cardId;
        },
    }
})

export const { selectCard } = card.actions;
export default card.reducer