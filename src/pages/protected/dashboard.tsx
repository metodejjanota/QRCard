import type { User } from "@supabase/supabase-js";
import type { NextPageContext } from "next";

import { createClient } from "@/lib/supabase/server-props";

export default function PrivatePage({ user }: { user: User }) {
	return (
		<div>
			<h1>Hello, {user.email || "user"}!</h1>);
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
