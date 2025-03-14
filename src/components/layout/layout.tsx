import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="container max-w-xs mx-auto">
			<main className="mt-12">{children}</main>
		</div>
	);
};

export default Layout;
