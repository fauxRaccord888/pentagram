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

import authReducer from "./authSlice";
import updateNodeReducer from "$feature/Pentagram/store/updateNodeSlice";

const baseReducer = combineReducers({
    auth: authReducer,
    updateNode: updateNodeReducer,
})

const persistConfig = {
    key: 'root',
    storage
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