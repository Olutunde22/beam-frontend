import { render, screen, fireEvent, waitFor } from "./test.utils";
import "@testing-library/jest-dom";
import { Login } from "@/pages/login";
import { describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
	return {
		useLoginMutation: vi.fn().mockReturnValue([vi.fn()]),
	};
});

vi.mock("@/state/api/auth-api-slice", () => ({
	useLoginMutation: mocks.useLoginMutation,
}));

describe("Login Page Tests", () => {
	test("Renders Login page and form", () => {
		render(<Login />);
		const headerElement = screen.getByText(/Sign in to Beam./i);
		const emailInput = screen.getByPlaceholderText(/Enter your email/i);
		const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole("button", { name: /Log in/i });
		expect(submitButton).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(headerElement).toBeInTheDocument();
	});

	test("Displays validation errors when form is submitted with empty fields", async () => {
		render(<Login />);
		const submitButton = screen.getByRole("button", { name: /Log in/i });
		fireEvent.click(submitButton);

		const emailError = await screen.findByText(/Email is required/i);
		const passwordError = await screen.findByText(/Password is required/i);

		expect(emailError).toBeInTheDocument();
		expect(passwordError).toBeInTheDocument();
	});

	test("Shows error message on invalid credentials", async () => {
		mocks.useLoginMutation.mockReturnValue([
			() => ({
				unwrap: () =>
					Promise.resolve({
						success: false,
						message: "Invalid credentials",
					}),
			}),
		]);

		render(<Login />);
		const emailInput = screen.getByPlaceholderText(/Enter your email/i);
		const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole("button", { name: /Log in/i });

		fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			const errorMessage = screen.getByText(/Invalid credentials/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});

	test("Submits form with valid credentials and shows success message", async () => {
		mocks.useLoginMutation.mockReturnValue([
			() => ({
				unwrap: () =>
					Promise.resolve({
						success: true,
						data: { user: { email: "test@example.com" } },
					}),
			}),
		]);
	
		render(<Login />);
		const emailInput = screen.getByPlaceholderText(/Enter your email/i);
		const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole("button", { name: /Log in/i });
	
		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);
	
		await waitFor(() => {
			const successMessage = screen.getByText(/Welcome back!/i);
			expect(successMessage).toBeInTheDocument();
		});
	});
});
