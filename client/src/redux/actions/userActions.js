import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const registerUserAction = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.post("/user/register", userData)
        console.log(data)
        return true
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message || error.message || "something went wrong")
    }
})
export const getUserAction = createAsyncThunk("user/get", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/user")
        return data.result
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message || error.message || "something went wrong")
    }
})
export const updateUserAction = createAsyncThunk("user/update", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.put(`/user/edit/${userData._id}`, userData)
        return data.result
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message || error.message || "something went wrong")
    }
})
export const deleteUserAction = createAsyncThunk("user/delete", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.delete(`/user/remove/${userData._id}`)
        return data.result
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message || error.message || "something went wrong")
    }
}) 