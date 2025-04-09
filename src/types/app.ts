export enum HTTP {
	POST = "POST",
	GET = "GET",
	PATCH = "PATCH",
	DELETE = "DELETE",
	PUT = "PUT",
}
export enum environment {
	PRODUCTION = "production",
	DEVELOPMENT = "development",
}

export enum PaymentOption {
	BANK_TRANSFER = "bank_transfer",
	CREDIT_OR_DEBIT = "credit_or_debit",
}

export interface IOption {
	label: string;
	value: string;
}

export interface IModalProps<T> {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onOkay?: (data: T) => void;
}

export interface IUser {
	id: string;
	fullName: string;
	email: string;
	accessToken: string;
	accessTokenExpiresAt: number;
}

export interface IResponse<T> {
	data: T;
	success: boolean;
	message: string | string[];
	statusCode: number;
}

export interface IPaginatedResponseData<T> {
	data: {
		currentPage: number;
		pageSize: number;
		totalRecords: number;
		totalPages: number;
		data: T;
	};
	success: boolean;
	message: string | string[];
	statusCode: number;
}

export interface IErrorResponse {
	success: boolean;
	message: string | string[];
	statusCode: number;
}

export interface IBalanceResponse {
	id: string;
	userId: string;
	bankId: string;
	balance: number;
	bank: {
		id: string;
		name: string;
		code: string;
		createdAt: string;
		updatedAt: string;
	};
	createdAt: string;
	updatedAt: string;
}

export enum TransactionType {
	DEPOSIT = "deposit",
	WITHDRAWAL = "withdrawal",
	TRANSFER = "transfer",
}

export enum TransactionStatus {
	PENDING = "pending",
	SUCCESSFUL = "successful",
	FAILED = "failed",
}

export enum TransactionDirection {
	CREDIT = "credit",
	DEBIT = "debit",
}

export interface ITransactionResponse {
	id: string;
	type: TransactionType;
	direction: TransactionDirection;
	status: TransactionStatus;
	amount: number;
	note: string | null;
	userId: string;
	createdAt: string;
	updatedAt: string;
}
