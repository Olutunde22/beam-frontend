import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import { rootReducer } from "./combined-reducers";
import { environment } from "@/types/app";
import { apiSlice } from "./api-slice";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { reload } from "./slice/auth-slice";

const persistConfig: PersistConfig<RootState> = {
	key: "beam",
	storage: storageSession,
	blacklist: [apiSlice.reducerPath],
	transforms: [
		encryptTransform({
			secretKey: "Secret_Key",
			onError() {
				store.dispatch(reload());
			},
		}),
	],
};

const appReducer: Reducer = (state: RootState, action: AnyAction) => {
	if (action.type === "auth/logout" || action.type === "auth/reload") {
		// this applies to all keys defined in persistConfig(s)
		storageSession.removeItem("persist:beam");
		state = {} as RootState;
		window.location.href = "/login"
		if (action.type === "auth/reload") window.location.reload();
	}
	return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== environment.PRODUCTION,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
