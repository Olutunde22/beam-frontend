import { createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RootState } from "./store";

const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: "" }
	): BaseQueryFn<
		{
			url: string;
			method?: AxiosRequestConfig["method"];
			data?: AxiosRequestConfig["data"];
			params?: AxiosRequestConfig["params"];
			headers?: AxiosRequestConfig["headers"];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params, headers }, api) => {
		const state = api.getState() as RootState;

		if (state.auth.user?.accessTokenExpiresAt) {
			const currentTime = Date.now();
			if (currentTime >= state.auth.user.accessTokenExpiresAt) {
				// Log the user out
				api.dispatch({ type: "auth/logout" });
				return {
					data: { statusCode: 401, message: "Access token has expired" },
				};
			}
		}

		if (state.auth.user?.accessToken) {
			headers = {
				...headers,
				Authorization: `Bearer ${state.auth.user?.accessToken}`,
			};
		}

		try {
			const result = await axios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				data: err.response?.data,
			};
		}
	};

export const apiSlice = createApi({
	baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_API }),
	endpoints: () => ({}),
	tagTypes: ['wallet', 'transaction']
});
