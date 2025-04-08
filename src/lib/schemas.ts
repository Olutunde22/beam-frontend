import * as yup from "yup";

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("First name is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
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

export const cardDetailsSchema = yup.object().shape({
    cardNumber: yup
        .string()
        .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
        .required("Card number is required"),
    expiryDate: yup
        .string()
        .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in DD/MM/YY format")
        .required("Expiry date is required"),
    cvv: yup
        .string()
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
        .required("CVV is required"),
});