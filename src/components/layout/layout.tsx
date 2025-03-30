import { ReactNode } from "react";
import { useRouter } from "next/router";
import { NavBottom, NavTop } from "./nav";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const router = useRouter();
	return (
		<div className="container max-w-lg mx-auto">
			<NavTop />
			<main className="my-20 overflow-y-auto min-h-screen p-4">{children}</main>
			<NavBottom />
		</div>
	);
};

export default Layout;
