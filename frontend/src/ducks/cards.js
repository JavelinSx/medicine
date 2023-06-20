import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { map } from "lodash";
import MainApi from "../utils/Api";
import { getFileZip } from '../utils/getFileZip';
import {
    getCard,
    getCards,
    setCard,
    setCards,
    getCardsPatient,
    setCardsPatient
} from '../utils/sessionStorageInfo'

const GET_ALL_CARDS_FETCH = '/cards'
const GET_CARD_FETCH = '/card'
const DELETE_CARD_FETCH = '/card/delete'
const CREATE_CARD_FETCH = 'create/card'
const CARD_UPDATE_FETCH = 'card/update'
const GET_CARDS_PATIENT_FETCH = 'card/patient'
// здесь в полученной карточке, мы смотрим resultForm['1,2,2,1,1'] содержащий строку, конвертируем в массив чисел
const parseArray = (obj) => {
    if (obj.resultForm.length>0) {
      const resultFormString = obj.resultForm[0];
      const resultFormArray = resultFormString.split(',');
      const resultFormNumbers = resultFormArray.map(Number);
  
      return { ...obj, resultForm: resultFormNumbers };
    }
  
    return obj;
  };

const initialState = {
    card: getCard || {},
    cards: getCards || [],
    cardsPatient: getCardsPatient || [],
    cardFiles: {},
    createdCard: null,
    deletedCard: {},
    selectedCard: null,

}

export const fetchGetCardFile = createAsyncThunk(
    GET_CARD_FETCH,
    async (data) => {
      try {
        const response = await MainApi.getCardFile(data);
        const fileData = await getFileZip(response); // Передаем response напрямую в getFileZip
        return fileData;
      } catch (error) {
        throw error;
      }
    }
);

export const fetchGetAllCardsFromPatient = createAsyncThunk(GET_CARDS_PATIENT_FETCH, async(data) => {
    return await MainApi.getCardsPatient(data)
        .then((cards) => cards)
        .catch((err) => {throw err})
})

export const fetchGetAllCards = createAsyncThunk(GET_ALL_CARDS_FETCH, async() => {
    return await MainApi.getCards()
        .then((card) => card)
        .catch((err) => {throw err})
})

export const fetchDeleteCard = createAsyncThunk(DELETE_CARD_FETCH, async(data) => {
    return await MainApi.deleteCard(data)
        .then((cards) => cards)
        .catch((err) => {throw err})
})

export const fetchCreateCard = createAsyncThunk(CREATE_CARD_FETCH, async(id) => {
    return MainApi.createCard(id)
        .then((user) => user)
        .catch((err) => {throw err})
})

export const fetchUpdateCard = createAsyncThunk(CARD_UPDATE_FETCH, async(data) => {
    return await MainApi.updateCard(data)
        .then((user) => user)
        .catch((err) => {throw err})
})



const card = createSlice({
    name: 'card',
    initialState,
    reducers:{
        selectCard: (state, action) => {

            const updatedCard = parseArray(action.payload[0]);
            const cardId = updatedCard._id;
            state.card = {
                ...updatedCard,
                previewFileMRT: state.cardFiles?.fileMRT,
                previewFileKT: state.cardFiles?.fileKT,
            }
            state.selectedCard = state.selectedCard === cardId ? null : cardId;  
            setCard(state.selectedCard);   
        },
    },
    extraReducers: builder => {
        builder
        //fetchCreatePatient
            .addCase(fetchGetAllCardsFromPatient.pending, (state, action) => {
                state.loadingUpdate = true
            })
            .addCase(fetchGetAllCardsFromPatient.fulfilled, (state, action) => {
                state.cardsPatient = action.payload?.map((card) => {
                    const colorCard = card.status==='new' ? 'card-new' : card.status==='updated' ? 'card-updated' : card.status==='confirmed' ? 'card-confirmed' : null
                    const statusRU = card.status==='new' ? 'новая' : card.status==='updated' ? 'изменённая' : card.status==='confirmed' ? 'закрытая' : null
                    const modifiedCard = {...card, colorCard: colorCard, statusRU: statusRU}
                    return modifiedCard
                });
                state.loadingUpdate = false;
                setCardsPatient(state.cardsPatient)
            })
            .addCase(fetchGetAllCardsFromPatient.rejected, (state, action) => {
                state.errorUpdate = action.payload;
                state.loadingUpdate = false;
            })  
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
        //fetchCreateCard
            .addCase(fetchCreateCard.pending, (state, action) => {
                state.loadingPost = true
            })
            .addCase(fetchCreateCard.fulfilled, (state, action) => {
                state.createdCard = action.payload;
                state.loadingPost = false;
                state.errorPost = null
            })
            .addCase(fetchCreateCard.rejected, (state, action) => {
                state.errorPost = action.error.message;
                state.loadingPost = false;
            })
        //fetchGetAllCards
            .addCase(fetchDeleteCard.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchDeleteCard.fulfilled, (state, action) => {
                state.deletedCard = action.payload;
                state.loadingGet = false;
                state.errorGet = null;
            })
            .addCase(fetchDeleteCard.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
        //fetchGetCardFile
            .addCase(fetchGetCardFile.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchGetCardFile.fulfilled, (state, action) => {
                console.log(action.payload)
                state.cardFiles = action.payload
                state.loadingGet = false;
                state.errorGet = null;
            })
            .addCase(fetchGetCardFile.rejected, (state, action) => {
                state.cardFiles = {}
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
        //fetchGetAllCards
            .addCase(fetchGetAllCards.pending, (state, action) => {
                state.loadingGet = true
            })
            .addCase(fetchGetAllCards.fulfilled, (state, action) => {
                state.cards = action.payload?.map((card) => {
                    const colorCard = card.status==='new' ? 'card-new' : card.status==='updated' ? 'card-updated' : card.status==='confirmed' ? 'card-confirmed' : null
                    const statusRU = card.status==='new' ? 'новая' : card.status==='updated' ? 'изменённая' : card.status==='confirmed' ? 'закрытая' : null
                    const modifiedCard = {...card, colorCard: colorCard, statusRU: statusRU}
                    console.log(statusRU, 'statusRU')
                    console.log(modifiedCard, 'modifiedCard')
                    return modifiedCard
                });
                state.loadingGet = false;
                state.errorGet = null;
                setCards(action.payload)
            })
            .addCase(fetchGetAllCards.rejected, (state, action) => {
                state.errorGet = action.error.message;
                state.loadingGet = false;
            })
    }
})

export const { selectCard } = card.actions;
export default card.reducer