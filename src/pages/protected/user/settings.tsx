import { Button, Divider } from "@heroui/react";
import { EditIcon, LogOutIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";

import { ICard } from "@/lib/types/card";

export default function Settings({ user, card }: { user: User; card: ICard }) {
	const handleLogout = async () => {
		const supabase = createClient();
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error logging out:", error);
		} else {
			if (typeof window !== "undefined") {
				window.location.href = "/";
			}
		}
	};

	return (
		<div className="w-full h-full flex flex-col gap-6">
			<h1 className="text-4xl font-bold">Settings</h1>
			<div className="flex flex-col gap-2">
				<Button
					variant="solid"
					color="primary"
					onClick={() => {
						window.location.href = "/protected/user/settings/edit-card";
					}}
				>
					<EditIcon size={20} strokeWidth={2} />
					Edit Card
				</Button>
			</div>
			<Divider className="w-full" />
			<div className="flex flex-col gap-2">
				<Button
					variant="solid"
					onClick={() => {
						handleLogout();
					}}
				>
					<LogOutIcon size={20} strokeWidth={2} />
					Logout
				</Button>
			</div>
		</div>
	);
}

Settings.getInitialProps = async (context: NextPageContext) => {
	const supabase = createClient(context);

	const { data: userData, error: userError } = await supabase.auth.getUser();
	if (userError || !userData) {
		if (context.res) {
			context.res.writeHead(302, { Location: "/" });
			context.res.end();
		} else {
			document.location.pathname = "/";
		}
		return { user: null };
	}

	const user = userData.user;

	const { data: cardData, error: cardError } = await supabase
		.from("cards")
		.select("*")
		.eq("user_id", user.id)
		.single();

	if (cardError || !cardData) {
		const { data: newCard, error: createError } = await supabase
			.from("cards")
			.insert([
				{
					user_id: user.id,
					email: user.email,
				},
			])
			.select()
			.single();

		if (createError) {
			console.error("Error creating card:", createError);
			return {
				user,
			};
		}

		return {
			user,
			card: newCard,
		};
	}

	return {
		user,
		card: cardData,
	};
};
