import { FundType, TransferType, WithdrawType } from "@/lib/schemas";
import { HTTP, IBalanceResponse, IResponse } from "../../types/app";
import { apiSlice } from "../api-slice";

export const balanceApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWalletBalance: builder.query<IResponse<IBalanceResponse>, void>({
			query: () => ({
				url: "/wallet/balance",
				method: HTTP.GET,
			}),
			providesTags: ["wallet"],
		}),
		withdraw: builder.mutation<IResponse<{ message: string }>, WithdrawType>({
			query: (data) => ({
				url: "/wallet/withdraw",
				method: HTTP.POST,
				data,
			}),
			invalidatesTags: ['wallet', 'transaction']
		}),
		fund: builder.mutation<IResponse<{ message: string }>, FundType>({
			query: (data) => ({
				url: "/wallet/fund",
				method: HTTP.POST,
				data,
			}),
			invalidatesTags: ['wallet', 'transaction']
		}),
		transfer: builder.mutation<IResponse<{ message: string }>, TransferType>({
			query: (data) => ({
				url: "/wallet/transfer",
				method: HTTP.POST,
				data,
			}),
			invalidatesTags: ['wallet', 'transaction']
		}),
	}),
});

export const { useGetWalletBalanceQuery, useWithdrawMutation, useFundMutation, useTransferMutation } = balanceApiSlice;
