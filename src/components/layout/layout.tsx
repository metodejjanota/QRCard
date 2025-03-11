import { NavTop, NavBottom } from "./nav";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="container max-w-md mx-auto">
			<NavTop />
			<main>{children}</main>
			<NavBottom />
		</div>
	);
};

export default Layout;
