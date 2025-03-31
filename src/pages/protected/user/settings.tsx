import { Button, Divider } from "@heroui/react";
import { EditIcon, LogOutIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server-props";

export default function Settings() {
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
