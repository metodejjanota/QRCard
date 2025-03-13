import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="container max-w-lg mx-auto">
			<main>{children}</main>
		</div>
	);
};

export default Layout;
