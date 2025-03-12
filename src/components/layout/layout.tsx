import { NavTop, NavBottom } from "./nav";
import { ReactNode } from "react";
import { useAuth } from "@/lib/authHook";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { loading, isAuthenticated } = useAuth();
	return (
		<div className="container max-w-md mx-auto">
			{!loading && isAuthenticated && <NavTop />}
			<main>{children}</main>
			{!loading && isAuthenticated && <NavBottom />}
		</div>
	);
};

export default Layout;
