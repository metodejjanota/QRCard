import type { User } from "@supabase/supabase-js";
import type { NextPageContext } from "next";

import { createClient } from "@/lib/supabase/server-props";

export default function PrivatePage({ user }: { user: User }) {
	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="w-full h-full flex justify-center items-center aspect-square bg-accent rounded-2xl"></div>
			<div className="w-full h-full flex flex-col gap-12 text-center">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">{user.email || "user"}</h1>
					<p className="text-lg opacity-70">
						Welcome to your private page. You are logged in.
					</p>
				</div>
				<p className="text-sm opacity-70">
					If you want to edit your business card,
					<span
						onClick={() => {
							if (typeof window !== "undefined") {
								window.location.pathname = "/protected/edit-card";
							}
						}}
						className="text-accent cursor-pointer"
						style={{ textDecoration: "underline" }}
					>
						click here
					</span>
				</p>
			</div>
		</div>
	);
}

PrivatePage.getInitialProps = async (context: NextPageContext) => {
	const supabase = createClient(context);

	const { data, error } = await supabase.auth.getUser();

	if (error || !data) {
		if (context.res) {
			context.res.writeHead(302, { Location: "/" });
			context.res.end();
		} else {
			document.location.pathname = "/";
		}
		return { user: null };
	}

	return {
		user: data.user,
	};
};
