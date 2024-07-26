import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeMessage } from "../../helper/interface";

export interface MessagesState extends TypeMessage {
    id: number,
    isValidSend?: boolean;
    isValidError?: boolean;
}

export interface TypeStateCorrespondence{
    displayNameCompanion: string;
    uidCompanion: string;
    photoUrlCompanion: string;
    addMessage: boolean;
    addMessageError?: string;
    sendMessages: MessagesState[]
    errorMessages: MessagesState[]
}

const initialState: TypeStateCorrespondence = {
    displayNameCompanion: '',
    uidCompanion: '',
    photoUrlCompanion: '',
    addMessage: false,
    sendMessages: [],
    errorMessages: []
}


const correspondenceSlice = createSlice({
    name: 'correspondence',
    initialState,
    reducers: {
        updateCorrespondence(state, action: PayloadAction<TypeStateCorrespondence>){
            state.displayNameCompanion = action.payload.displayNameCompanion
            state.uidCompanion = action.payload.uidCompanion
            state.photoUrlCompanion = action.payload.photoUrlCompanion
        },
        sendLoading(state, action: PayloadAction<MessagesState>){
            state.sendMessages.push(action.payload)
        },
        deleteLoading(state, action: PayloadAction<number>){
            state.sendMessages = state.sendMessages?.filter( el => el.id != action.payload)
        },
        errorLoading(state, action: PayloadAction<MessagesState>){
            console.log('res')
            state.sendMessages = state.sendMessages?.filter( el => el.id != action.payload.id)
            state.errorMessages.push(action.payload)
        }
    }
})


export default correspondenceSlice.reducer
export const correspondenceAction = correspondenceSlice.actions