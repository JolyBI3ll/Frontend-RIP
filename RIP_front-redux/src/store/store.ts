import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from "./authSlice"
import productFilterReducer from "./productFilterSlice"
import orderFilterReducer from "./orderFilterSlice"
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import buttonReducer from "./buttonSlice"

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: authReducer,
    productFilter: productFilterReducer,
    orderFilter: orderFilterReducer,
    button: buttonReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)