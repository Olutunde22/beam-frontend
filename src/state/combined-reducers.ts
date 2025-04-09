import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api-slice";
import authReducer from './slice/auth-slice'

export const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
});
