import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productFilterReducer from "./productFilterSlice"
import buttonReducer from "./buttonSlice"

export default configureStore({
    reducer: {
        productFilter: productFilterReducer,
        user: authReducer,
        button: buttonReducer,
    }
})