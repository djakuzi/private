import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
import { saveStateLocalStorage } from "./helper/localStorage";
import useReducer, { PROFILE_DATA } from "./slice/user.slice";



export const store = configureStore({
    reducer: {
        user:useReducer,
    }
})


store.subscribe( ()=>{
    saveStateLocalStorage<UserInfo | null>(PROFILE_DATA, store.getState().user.profile)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch