import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../components/auth/AuthSlice";
import UserSlice from "../components/Cardholder/UserSlice";
import CardSlice from "../components/Cards/CardSlice";



const combineReducer = combineReducers({
    auth: AuthSlice,
    user: UserSlice,
    card: CardSlice
});

const store = configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(),
});

export default store
