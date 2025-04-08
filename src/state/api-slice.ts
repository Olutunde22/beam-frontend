import { createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

export const axiosBaseQuery =
	({ baseUrl }: { baseUrl?: string } = {}): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig["method"];
			data?: AxiosRequestConfig["data"];
			params?: AxiosRequestConfig["params"];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await axios({
				url: baseUrl ? baseUrl + url : url,
				method,
				data,
				params,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

export const apiSlice = createApi({
	baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_API }),
	endpoints: () => ({}),
});
