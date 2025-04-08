import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./combined-reducers";
import { environment } from "@/types/app";
import { apiSlice } from "./api-slice";

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== environment.PRODUCTION,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
