import { createSlice } from "@reduxjs/toolkit";
import { deleteUserAction, getUserAction, registerUserAction, updateUserAction } from "../actions/userActions";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }

    },
    extraReducers: builder => {
        builder
            .addCase(registerUserAction.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(registerUserAction.fulfilled, (state, { payload }) => {
                state.loading = false
                state.registered = true
            })
            .addCase(registerUserAction.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(getUserAction.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getUserAction.fulfilled, (state, { payload }) => {
                state.loading = false
                state.users = payload
            })
            .addCase(getUserAction.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(updateUserAction.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(updateUserAction.fulfilled, (state, { payload }) => {
                state.loading = false
                state.updated = true
            })
            .addCase(updateUserAction.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(deleteUserAction.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(deleteUserAction.fulfilled, (state, { payload }) => {
                state.loading = false
                state.deleted = true
            })
            .addCase(deleteUserAction.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export const { invalidate } = userSlice.actions
export default userSlice.reducer