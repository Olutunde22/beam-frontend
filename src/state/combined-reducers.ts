import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api-slice";

export const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
});
