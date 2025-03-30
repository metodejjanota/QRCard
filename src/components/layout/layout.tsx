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
			{router.pathname.includes("/protected/") ? (
				<>
					<NavTop />
					<main className="my-20 overflow-y-auto min-h-screen p-4">
						{children}
					</main>
					<NavBottom />
				</>
			) : (
				<main className="mt-12">{children}</main>
			)}
		</div>
	);
};

export default Layout;
