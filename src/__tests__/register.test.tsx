import { Register } from "@/pages/register";
import { render, screen, fireEvent, waitFor } from "./test.utils";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => {
	return {
		useRegisterMutation: vi.fn().mockReturnValue([vi.fn()]),
	};
});

vi.mock("@/state/api/auth-api-slice", () => ({
	useRegisterMutation: mocks.useRegisterMutation,
}));

describe("Register Page Tests", () => {
	test("Renders Register page and form", () => {
		render(<Register />);
		const headerElement = screen.getByText(/Create an account/i);
		const fullNameInput = screen.getByPlaceholderText(/Enter your full name/i);
		const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
		const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole("button", { name: /Register/i });
		const termsCheckbox = screen.getByRole("checkbox");

		expect(submitButton).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(fullNameInput).toBeInTheDocument();
		expect(headerElement).toBeInTheDocument();
		expect(termsCheckbox).toBeInTheDocument();
	});

	test("Displays validation errors when form is submitted with empty fields", async () => {
		render(<Register />);
		const submitButton = screen.getByRole("button", { name: /Register/i });
		fireEvent.click(submitButton);

		const fullNameError = await screen.findByText(/Full name is required/i);
		const emailError = await screen.findByText(/Email is required/i);
		const passwordError = await screen.findByText(/Password is required/i);
		const termsError = await screen.findByText(/You must agree to the terms and conditions/i);

		expect(emailError).toBeInTheDocument();
		expect(fullNameError).toBeInTheDocument();
		expect(passwordError).toBeInTheDocument();
		expect(termsError).toBeInTheDocument();
	});

	test("Displays password validation error", async () => {
		render(<Register />);
		const fullNameInput = screen.getByPlaceholderText(/Enter your full name/i);
		const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
		const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole("button", { name: /Register/i });
		const termsCheckbox = screen.getByRole("checkbox");

		fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password" } });
		fireEvent.change(fullNameInput, { target: { value: "Beam user" } });
		fireEvent.click(termsCheckbox);
		fireEvent.click(submitButton);

		const passwordError = await screen.findByText(
			/Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character/i
		);

		expect(passwordError).toBeInTheDocument();
	});

	test("Shows error message on email exists", async () => {
		mocks.useRegisterMutation.mockReturnValue([
			() => ({
				unwrap: () =>
					Promise.resolve({
						success: false,
						message: "Email already exists",
					}),
			}),
		]);

		render(<Register />);
		const fullNameInput = screen.getByPlaceholderText(/Enter your full name/i);
		const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
		const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole("button", { name: /Register/i });
		const termsCheckbox = screen.getByRole("checkbox");

		fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "Password123#" } });
		fireEvent.change(fullNameInput, { target: { value: "Beam user" } });
		fireEvent.click(termsCheckbox);
		fireEvent.click(submitButton);

		await waitFor(() => {
			const errorMessage = screen.getByText(/Email already exists/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});

	test("Submits form with valid credentials and shows success message", async () => {
		mocks.useRegisterMutation.mockReturnValue([
			() => ({
				unwrap: () =>
					Promise.resolve({
						success: true,
						data: { user: { email: "test@example.com" } },
					}),
			}),
		]);

		render(<Register />);
		const fullNameInput = screen.getByPlaceholderText(/Enter your full name/i);
		const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
		const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole("button", { name: /Register/i });
		const termsCheckbox = screen.getByRole("checkbox");

		fireEvent.change(emailInput, { target: { value: "correct@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "Password123#" } });
		fireEvent.change(fullNameInput, { target: { value: "Beam user" } });
		fireEvent.click(termsCheckbox);
		fireEvent.click(submitButton);

		await waitFor(() => {
			const successMessage = screen.getByText(/Welcome to beam!/i);
			expect(successMessage).toBeInTheDocument();
		});
	});
});
