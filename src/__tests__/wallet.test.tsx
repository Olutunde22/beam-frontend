import { render, screen, fireEvent, waitFor } from "./test.utils";
import "@testing-library/jest-dom";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { Component } from "@/pages/wallet";

const mocks = vi.hoisted(() => {
	return {
		useWithdrawMutation: vi.fn().mockReturnValue([vi.fn()]),
		useTransferMutation: vi.fn().mockReturnValue([vi.fn()]),
		useFundMutation: vi.fn().mockReturnValue([vi.fn()]),
		useListTransactionsQuery: vi
			.fn()
			.mockRejectedValue({ isLoading: false, data: {} }),
		useGetWalletBalanceQuery: vi
			.fn()
			.mockRejectedValue({ isLoading: false, data: {} }),
	};
});

class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

vi.mock("use-resize-observer", () => ({
	__esModule: true,
	default: vi.fn().mockImplementation(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	})),
}));

vi.mock("@/state/api/wallet-api-slice", () => ({
	useGetWalletBalanceQuery: mocks.useGetWalletBalanceQuery,
	useListTransactionsQuery: mocks.useListTransactionsQuery,
	useWithdrawMutation: mocks.useWithdrawMutation,
	useTransferMutation: mocks.useTransferMutation,
	useFundMutation: mocks.useFundMutation,
}));

vi.mock("@/state/api/transaction-api-slice", () => ({
	useListTransactionsQuery: mocks.useListTransactionsQuery,
}));

describe("Wallet Page Tests", () => {
	beforeAll(() => {
		window.ResizeObserver = ResizeObserver;
	});
	test("Renders Wallet page", () => {
		render(<Component />);
		const headerElement = screen.getAllByText(/Wallet/i)[0];
		expect(headerElement).toBeInTheDocument();
	});

	test("Displays wallet balance when API call succeeds", async () => {
		mocks.useGetWalletBalanceQuery.mockReturnValue({
			data: {
				success: true,
				data: {
					id: "1",
					userId: "user-1",
					bankId: "bank-1",
					balance: 5000.5,
					bank: {
						id: "bank-1",
						name: "GTBank",
						code: "058",
						createdAt: "",
						updatedAt: "",
					},
					createdAt: "",
					updatedAt: "",
				},
			},
			isLoading: false,
		});

		render(<Component />);
		expect(await screen.findByText(/₦5,000/)).toBeInTheDocument();
		expect(await screen.findByText(/GTBank 010 210 2020/)).toBeInTheDocument();
	});

	test("Displays no balance when API call fails", async () => {
		mocks.useGetWalletBalanceQuery.mockReturnValue({
			data: {
				success: false,
				message: "Something went wrong",
			},
			isLoading: false,
		});

		render(<Component />);
		await waitFor(() => {
			expect(screen.queryByText(/₦5,000/)).not.toBeInTheDocument();
		});
	});

	test("Displays transaction history when API call succeeds", async () => {
		mocks.useListTransactionsQuery.mockReturnValue({
			data: {
				success: true,
				data: {
					pageSize: 10,
					currentPage: 1,
					totalRecords: 2,
					totalPages: 1,
					data: [
						{
							id: "txn-1",
							type: "deposit",
							direction: "credit",
							status: "successful",
							amount: 1000,
							note: null,
							userId: "user-1",
							createdAt: "2025-04-10T00:00:00Z",
							updatedAt: "2025-04-10T00:00:00Z",
						},
						{
							id: "txn-2",
							type: "withdrawal",
							direction: "debit",
							status: "failed",
							amount: 500,
							note: "Insufficient funds",
							userId: "user-1",
							createdAt: "2025-04-09T00:00:00Z",
							updatedAt: "2025-04-09T00:00:00Z",
						},
					],
				},
			},
			isLoading: false,
		});

		render(<Component />);
		const rows = await screen.findAllByRole("row");
		expect(rows.length).toBeGreaterThan(2);
	});

	test("Transfer funds when API call succeeds", async () => {
		mocks.useTransferMutation.mockReturnValue([
			() => ({
				unwrap: () =>
					Promise.resolve({
						success: true,
					}),
			}),
		]);

		render(<Component />);
		const openButton = screen.getByRole("button", { name: /Transfer/i });
		fireEvent.click(openButton);

		const emailInput = screen.getByPlaceholderText(
			/Enter the email of the person you want to transfer to/i
		);
		const amountInput = screen.getByPlaceholderText(
			/Enter the amount to send/i
		);
		const submitButton = screen.getByRole("button", {
			name: /Transfer Funds/i,
		});

		fireEvent.change(amountInput, { target: { value: "5000" } });
		fireEvent.change(emailInput, { target: { value: "olutunde@gmail.com" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			const successMessage = screen.getByText(/Funds sent!/i);
			expect(successMessage).toBeInTheDocument();
		});
	});

    test("Displays error when api call fails", async () => {
		mocks.useTransferMutation.mockReturnValue([
			() => ({
				unwrap: () =>
					Promise.resolve({
						success: false,
                        message: "Insufficient Funds!"
					}),
			}),
		]);

		render(<Component />);
		const openButton = screen.getByRole("button", { name: /Transfer/i });
		fireEvent.click(openButton);

		const emailInput = screen.getByPlaceholderText(
			/Enter the email of the person you want to transfer to/i
		);
		const amountInput = screen.getByPlaceholderText(
			/Enter the amount to send/i
		);
		const submitButton = screen.getByRole("button", {
			name: /Transfer Funds/i,
		});

		fireEvent.change(amountInput, { target: { value: "5000" } });
		fireEvent.change(emailInput, { target: { value: "olutunde@gmail.com" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			const errorMessage = screen.getByText(/Insufficient Funds!/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});
});
