import React from "react";
import { BellIcon } from "lucide-react";
import { useRouter } from "next/router";

const NavTop = () => {
	return (
		<div className="w-full h-20 fixed bg-amber-500 top-0 left-0 items-center">
			<div className="container ">
				<div className="w-full h-full flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-black"></h1>
						<p className="text-sm">
							This is a travel app that helps you plan your trips.
						</p>
					</div>

					<div>
						<BellIcon size={24} />
					</div>
				</div>
			</div>
		</div>
	);
};

const NavBottom = () => {
	const router = useRouter();
	return (
		<div className="fixed left-0 bottom-0 w-full h-30 flex justify-around items-center">
			<div className="w-full h-full flex justify-around items-center">
				<button
					className="btn btn-outline btn-lg"
					onClick={() => router.push("/auth/login")}
				>
					nevim
				</button>
			</div>
		</div>
	);
};

export { NavBottom, NavTop };
