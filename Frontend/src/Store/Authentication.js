import { createSlice } from "@reduxjs/toolkit"

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: { isLoggedIn: false , role: "user"},
    reducers:{
        login(state){
            state.isLoggedIn = true;

        },
        logout(state){
            state.isLoggedIn = false;
        },
        changeRole(state, action){
            const role = action.payload;
            state.role = role;
        },
    },
});


export const  authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;