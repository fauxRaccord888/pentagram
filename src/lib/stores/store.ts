import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";  
import storage from 'redux-persist/lib/storage' 

import pentagramUpsertReducer from "$feature/Pentagram/store/pentagramUpsertSlice";
import authReducer from "$feature/auth/store/authSlice";
import modalReducer from "$feature/portal/store/modalSlice";

const baseReducer = combineReducers({
    pentagramUpsert: pentagramUpsertReducer,
    auth: authReducer,
    modal: modalReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["auth"]
}

const persistedReducer  = persistReducer(
    persistConfig, 
    baseReducer
)

export const store = configureStore({
    reducer: persistedReducer,
    // https://github.com/rt2zz/redux-persist/issues/988
    middleware: getDefaultMiddleware => getDefaultMiddleware({ 
        serializableCheck: { 
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        } 
    }), 
})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>
export type AppStore = typeof store