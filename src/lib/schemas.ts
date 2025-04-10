import * as yup from "yup";

export type LoginType = yup.InferType<typeof loginSchema>;
export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

export type RegisterType = yup.InferType<typeof registerSchema>;
export const registerSchema = yup.object().shape({
	fullName: yup.string().required("Full name is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
			message:
				"Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
		}),
	agreeToTerms: yup
		.boolean()
		.oneOf([true], "You must agree to the terms and conditions")
		.required("Agreement to terms and conditions is required"),
});

export const forgotPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
});

export type CardDetailsType = yup.InferType<typeof cardDetailsSchema>;
export const cardDetailsSchema = yup.object().shape({
	cardNumber: yup
		.string()
		.matches(/^\d{16}$/, "Card number must be exactly 16 digits")
		.required("Card number is required"),
	expiryDate: yup
		.string()
		.matches(
			/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{2})$/,
			"Expiry date must be in DD/MM/YY format"
		)
		.required("Expiry date is required"),
	cvv: yup
		.string()
		.matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
		.required("CVV is required"),
});

export type WithdrawType = yup.InferType<typeof withdrawSchema>;
export const withdrawSchema = yup.object().shape({
	amount: yup.number().required("Amount is required"),
	note: yup.string().optional(),
});

export type FundType = yup.InferType<typeof fundSchema>;
export const fundSchema = yup.object().shape({
	amount: yup.number().required("Amount is required"),
});

export type TransferType = yup.InferType<typeof transferSchema>;
export const transferSchema = yup.object().shape({
	amount: yup.number().required("Amount is required"),
	note: yup.string().optional(),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
});
