import { LogOutIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LibraryBigIcon, EditIcon, HouseIcon } from "lucide-react";
import { Button } from "@heroui/react";
import Image from "next/image";

const NavTop = () => {
	const router = useRouter();
	const [siteName, setSiteName] = useState("QRCard");

	async function logout() {
		const supabase = createClient();
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
			return;
		}
		router.push("/auth");
	}

	useEffect(() => {
		function updateSiteName() {
			const pathname = router.pathname;
			if (pathname === "/protected/bookmarks") {
				setSiteName("Bookmarks");
			} else if (pathname === "/protected/dashboard") {
				setSiteName("Dashboard");
			} else if (pathname === "/protected/edit-card") {
				setSiteName("Edit Card");
			} else {
				setSiteName("QRCard");
			}
		}
		updateSiteName();
	}, [router.pathname]);

	return (
		<div className="w-full fixed top-0 left-0 items-center z-10 bg-background border-b">
			<div className="p-4 mx-6">
				<div className="max-w-md mx-auto h-full">
					<div className="w-full h-full flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Image
								src="/logo.png"
								alt="Logo"
								width={40}
								height={40}
								className="rounded-sm"
							/>
							<h1 className="text-2xl font-bold">{siteName}</h1>
						</div>
						<Button isIconOnly variant="solid" onClick={() => logout()}>
							<LogOutIcon size={24} strokeWidth={2} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const NavBottom = () => {
	const router = useRouter();

	return (
		<div className="fixed left-0 bottom-0 w-full flex justify-around items-center z-10 bg-background border-t">
			<div className="p-4 mx-6 w-full flex flex-row justify-evenly">
				<Button
					variant={`${
						router.pathname === "/protected/bookmarks" ? "solid" : "light"
					}`}
					onClick={() => router.push("/protected/bookmarks")}
					isIconOnly
				>
					<LibraryBigIcon size={24} strokeWidth={2} />
				</Button>
				<Button
					variant={`${
						router.pathname === "/protected/dashboard" ? "solid" : "light"
					}`}
					onClick={() => router.push("/protected/dashboard")}
					isIconOnly
				>
					<HouseIcon size={24} strokeWidth={2} />
				</Button>

				<Button
					variant={`${
						router.pathname === "/protected/edit-card" ? "solid" : "light"
					}`}
					onClick={() => router.push("/protected/edit-card")}
					isIconOnly
				>
					<EditIcon size={24} strokeWidth={2} />
				</Button>
			</div>
		</div>
	);
};

export { NavTop, NavBottom };
