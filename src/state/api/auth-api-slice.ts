import { LoginType, RegisterType } from "@/lib/schemas";
import { HTTP, IResponse, IUser } from "../../types/app";
import { apiSlice } from "../api-slice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<IResponse<IUser>, LoginType>({
			query: (data) => ({
				url: "/auth/login",
				method: HTTP.POST,
				data,
			}),
		}),
		register: builder.mutation<IResponse<IUser>, RegisterType>({
			query: (data) => ({
				url: "/auth/verify-login",
				data,
				method: HTTP.POST,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
