import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/state/hook";

const AuthGuard = () => {
	const user = useAppSelector((state) => state.auth.user);
	const currentTime = Date.now();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (currentTime >= user?.accessTokenExpiresAt || !user.accessToken) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default AuthGuard;
