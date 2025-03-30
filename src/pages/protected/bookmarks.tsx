import type { User } from "@supabase/supabase-js";
import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/router";
import { ICard } from "@/lib/types/card";

export default function Bookmarks({
	user,
	bookmarks,
}: {
	user: User;
	bookmarks: { cards: ICard }[];
}) {
	const { Canvas } = useQRCode();
	const router = useRouter();
	const [bookmarksList, setBookmarksList] = useState(bookmarks);
	const supabase = createClient();

	const deleteBookmark = async (id: string, event: React.MouseEvent) => {
		event.preventDefault();
		const { error } = await supabase.from("bookmarks").delete().eq("id", id);
		if (error) {
			console.error("Error deleting bookmark:", error);
		} else {
			setBookmarksList(prev =>
				prev.filter(bookmark => bookmark.cards.id !== id)
			);

			const { error: deleteError } = await supabase
				.from("bookmarks")
				.delete()
				.eq("id", id);
			if (deleteError) {
				console.error("Error deleting bookmark:", deleteError);
			}
			console.log("Bookmark deleted successfully");
		}
	};

	const openBookmark = (id: string) => {
		router.push(`/card/${id}`);
	};

	return (
		<div>
			{bookmarksList.length === 0 ? (
				<div className="text-center text-gray-500">You have no bookmarks.</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{bookmarksList.map(bookmark => (
						<Card
							className="p-2 cursor-pointer relative"
							key={bookmark.cards.id}
						>
							<CardBody
								className="flex flex-row gap-4"
								onClick={() =>
									openBookmark(bookmark.cards.id?.toString() ?? "")
								}
							>
								{bookmark.cards.companyLogo === "" ||
								bookmark.cards.companyLogo === undefined ? (
									<Canvas
										text={"localhost:3000/card/" + bookmark.cards.id}
										options={{
											errorCorrectionLevel: "L",
											margin: 0,
											scale: 6,
											width: 100,
											color: {
												dark: "#000000",
												light: "#ffffff00",
											},
										}}
									/>
								) : (
									<Image
										alt="Card Logo"
										className="object-cover rounded-xl aspect-square"
										src={
											typeof bookmark.cards.companyLogo === "string"
												? bookmark.cards.companyLogo
												: URL.createObjectURL(bookmark.cards.companyLogo)
										}
										width={100}
										height={100}
									/>
								)}
								<div className="flex flex-col justify-center">
									<p className="text-tiny uppercase font-bold">
										{bookmark.cards.companyName}
									</p>
									<small className="text-default-500">
										{bookmark.cards.companyPosition}
									</small>
									<h4 className="font-bold text-large">
										{bookmark.cards.firstName} {bookmark.cards.lastName}
									</h4>
									<p className="text-default-500 text-tiny">
										{bookmark.cards.companyDescription}
									</p>
								</div>
							</CardBody>
							<CardFooter className="flex justify-between absolute bottom-0 left-0 right-0 p-2">
								<Button
									isIconOnly
									onClick={event =>
										bookmark.cards.id &&
										deleteBookmark(bookmark.cards.id, event)
									}
									className="z-10"
								>
									<Trash2Icon size={16} />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}

Bookmarks.getInitialProps = async (context: NextPageContext) => {
	const supabase = createClient(context);
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		if (context.res) {
			context.res.writeHead(302, { Location: "/" });
			context.res.end();
		} else {
			document.location.pathname = "/";
		}
		return { user: null, bookmarks: [] };
	}

	const { data: bookmarks, error: bookmarksError } = await supabase
		.from("bookmarks")
		.select("cards(*)")
		.eq("user_id", user.id);

	if (bookmarksError) {
		console.error("Error fetching bookmarks:", bookmarksError);
	}

	console.log("Bookmarks:", bookmarks);

	return {
		user,
		bookmarks: bookmarks || [],
	};
};
