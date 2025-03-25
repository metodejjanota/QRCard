import React from "react";
import { BellIcon, LogOutIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/router";

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
		<div className="w-full h-20 fixed bg-accent top-0 left-0 items-center">
			<div className="max-w-xs mx-auto h-full">
				<div className="w-full h-full flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-black">QRCard</h1>
					</div>

					<div className="flex gap-4">
						<LogOutIcon size={24} strokeWidth={3} onClick={() => logout()} />
					</div>
				</div>
			</div>
		</div>
	);
};

const NavBottom = () => {
	return (
		<div className="fixed left-0 bottom-0 w-full h-30 flex justify-around items-center">
			<div className="w-full h-full flex justify-around items-center">
				<button className="btn btn-outline btn-lg">
					share my profile link
				</button>
			</div>
		</div>
	);
};

export { NavBottom, NavTop };
