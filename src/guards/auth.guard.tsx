import { PropsWithChildren, ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { toast } from "sonner";
import { logout } from "@/state/slice/auth-slice";

const AuthGuard = ({ children }: PropsWithChildren): ReactNode => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const currentTime = Date.now();

	if (!user) {
		toast.error("You need to be logged in to visit this route");
		<Navigate to="/login" replace />;
		return null;
	}

	if (currentTime >= user?.accessTokenExpiresAt || !user.accessToken) {
		toast.error("Token expired, Please login");
		dispatch(logout());
		<Navigate to="/login" replace />;
		return null;
	}

	return children;
};

export default AuthGuard;
