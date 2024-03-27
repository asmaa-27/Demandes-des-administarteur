import { configureStore } from "@reduxjs/toolkit";
import DemandeReducer from "./DemandSlice"

const Store=configureStore({
    reducer: {
        demand:DemandeReducer
    }
})

export default Store;