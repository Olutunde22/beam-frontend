import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/state/hook";
import { toast } from "sonner";

const AuthGuard = () => {
	const user = useAppSelector((state) => state.auth.user);
	const currentTime = Date.now();

	if (!user) {
		toast.error("You need to be logged in to visit this route");
		return <Navigate to="/login" replace />;
	}

	if (currentTime >= user?.accessTokenExpiresAt || !user.accessToken) {
		toast.error("Token expired, Please login");
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default AuthGuard;
