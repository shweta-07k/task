import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice"

const reduxStore = configureStore({
    reducer: {
        user: userSlice,
    }
})

export default reduxStore