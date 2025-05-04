import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Authentication.js"
const Store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default Store;