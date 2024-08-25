import { createSlice } from "@reduxjs/toolkit"
import { InitialUserState } from "../types/user";
const initialState: InitialUserState = {
    user: null
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
})

export const {setUser, clearUser} = userSlice.actions
export default userSlice.reducer