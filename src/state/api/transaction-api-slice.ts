import {
	HTTP,
	ITransactionResponse,
	IPaginatedResponseData,
} from "../../types/app";
import { apiSlice } from "../api-slice";

export const transactionApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		listTransactions: builder.query<
			IPaginatedResponseData<ITransactionResponse[]>,
			{ page?: number; limit?: number }
		>({
			query: ({ page, limit }) => ({
				url: `/transactions?page=${page ?? 1}&limit=${limit ?? 10}`,
				method: HTTP.GET,
			}),
			providesTags: ["transaction"],
		}),
	}),
});

export const { useListTransactionsQuery } = transactionApiSlice;
