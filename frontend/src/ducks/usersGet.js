import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MainApi from "../utils/Api";
import { 
    getPatients, 
    getDoctors,
    getNurses, 
    getRegistrars,
    getCards,
    getCard,
    setPatients,
    setDoctors,
    setNurses,
    setRegistrars,
    setCards,
    setCard
} from "../utils/sessionStorageInfo";

const PATIENTS_INFO_FETCH = '/info/patients'
const DOCTORS_INFO_FETCH = '/info/doctors'
const NURSES_INFO_FETCH = '/info/nurses'
const REGISTRARS_INFO_FETCH = '/info/registrars'
const GET_ALL_CARDS_FETCH = '/cards'
const GET_CARD_FETCH = '/card'

const initialState = {
    patients: getPatients || [],
    doctors: getDoctors || [],
    nurses: getNurses || [],
    registrars: getRegistrars || [],
    cards: getCards || [],
    card: getCard || {},
    loadingGet: false,
    errorGet: null,
}

export const fetchGetCardFile = createAsyncThunk(GET_CARD_FETCH, async() => {
    return await MainApi.getCardFile()
    .then((user) => user)
    .catch((err) => {throw err})
})

export const fetchInfoDoctors = createAsyncThunk(DOCTORS_INFO_FETCH, async() => {
    return await MainApi.getDoctors()
    .then((user) => user)
    .catch((err) => {throw err})
})

export const fetchInfoRegistrars = createAsyncThunk(REGISTRARS_INFO_FETCH, async() => {
    return await MainApi.getRegistrars()
    .then((user) => user)
    .catch((err) => {throw err})
})

export const fetchInfoNurses = createAsyncThunk(NURSES_INFO_FETCH, async() => {
    return await MainApi.getNurses()
    .then((user) => user)
    .catch((err) => {throw err})
})

export const fetchInfoPatients = createAsyncThunk(PATIENTS_INFO_FETCH, async() => {
    return await MainApi.getPatients()
    .then((user) => user)
    .catch((err) => {throw err})
})

export const fetchGetAllCards = createAsyncThunk(GET_ALL_CARDS_FETCH, async() => {
    return await MainApi.getCards()
    .then((cards) => cards)
    .catch((err) => {throw err})
})

const usersGet = createSlice({
    name: 'usersGet',
    initialState,
    reducers:{
        
    },
    extraReducers: builder => {
        builder
        //fetchGetAllCards
            .addCase(fetchGetCardFile.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchGetCardFile.fulfilled, (state, action) => {
                state.card = action.payload;
                state.loadingGet = false;
                state.errorGet = null;
                setCard(action.payload)
            })
            .addCase(fetchGetCardFile.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
        //fetchGetAllCards
            .addCase(fetchGetAllCards.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchGetAllCards.fulfilled, (state, action) => {
                state.cards = action.payload;
                state.loadingGet = false;
                state.errorGet = null;
                setCards(action.payload)
            })
            .addCase(fetchGetAllCards.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
        //fetchInfoPatients
            .addCase(fetchInfoPatients.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchInfoPatients.fulfilled, (state, action) => {
                state.patients = action.payload;
                state.loadingGet = false;
                state.errorGet = null;
                setPatients(action.payload)
            })
            .addCase(fetchInfoPatients.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
        //fetchInfoDoctors
            .addCase(fetchInfoDoctors.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchInfoDoctors.fulfilled, (state, action) => {
                state.doctors = action.payload;
                state.loadingGet = false;
                state.errorGet = null;
                setDoctors(action.payload)
            })
            .addCase(fetchInfoDoctors.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
        //fetchInfoRegistrars
            .addCase(fetchInfoRegistrars.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchInfoRegistrars.fulfilled, (state, action) => {
                state.registrars = action.payload;
                state.loadingGet = false;
                state.errorGet = null;
                setRegistrars(action.payload)
            })
            .addCase(fetchInfoRegistrars.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
        //fetchInfoNurses
            .addCase(fetchInfoNurses.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchInfoNurses.fulfilled, (state, action) => {
                state.nurses = action.payload;
                state.loadingGet = false;
                state.errorGet = null;
                setNurses(action.payload)
            })
            .addCase(fetchInfoNurses.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
    }
})

export default usersGet.reducer