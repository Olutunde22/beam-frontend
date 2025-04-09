import { IUser } from "@/types/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
	user: IUser | null;
}

const initialState: IInitialState = {
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<{ user: IUser }>) => {
			if (action.payload.user) {
				state.user = { ...action.payload.user };
			}
		},
		logout: (state) => {
			state.user = null;
		},
		reload: () => {},
	},
});

export const { setCredentials, logout, reload } = authSlice.actions;

export default authSlice.reducer;
