import { LogOutIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/router";
import { LibraryBigIcon, EditIcon, HouseIcon } from "lucide-react";

const NavTop = () => {
	const router = useRouter();

	async function logout() {
		const supabase = createClient();
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
			return;
		}
		router.push("/auth");
	}

	return (
		<div className="w-full h-20 fixed bg-accent top-0 left-0 items-center z-10">
			<div className="max-w-xs mx-auto h-full">
				<div className="w-full h-full flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold">QRCard</h1>
					</div>
					<div className="flex gap-4 cursor-pointer">
						<LogOutIcon size={24} strokeWidth={3} onClick={() => logout()} />
					</div>
				</div>
			</div>
		</div>
	);
};

const NavBottom = () => {
	const router = useRouter();

	return (
		<div className="fixed left-0 bottom-0 w-full h-30 flex justify-around items-center z-10 bg-white border-t-2 shadow-lg">
			<div className="h-full flex items-center justify-between gap-2">
				<button
					className={`btn btn-outline btn-lg ${
						router.pathname === "/protected/bookmarks" ? "btn-primary" : ""
					}`}
					onClick={() => router.push("/protected/bookmarks")}
				>
					<LibraryBigIcon size={24} strokeWidth={2} />
				</button>
				<button
					className={`btn btn-outline btn-lg ${
						router.pathname === "/protected/dashboard" ? "btn-primary" : ""
					}`}
					onClick={() => router.push("/protected/dashboard")}
				>
					<HouseIcon size={24} strokeWidth={2} />
				</button>
				<button
					className={`btn btn-outline btn-lg ${
						router.pathname === "/protected/edit-card" ? "btn-primary" : ""
					}`}
					onClick={() => router.push("/protected/edit-card")}
				>
					<EditIcon size={24} strokeWidth={2} />
				</button>
			</div>
		</div>
	);
};

export { NavTop, NavBottom };
