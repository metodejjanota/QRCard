import { useState, useEffect } from "react";
import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";
import { ICard } from "@/lib/types/card";
import { Image, Skeleton, Button } from "@heroui/react";
import {
	InstagramIcon,
	FacebookIcon,
	LinkedinIcon,
	BookmarkIcon,
} from "lucide-react";

export default function CardPage({
	card,
	cardId,
}: {
	card: ICard | null;
	cardId: string | null;
}) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!card) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [card]);

	const handleBookmark = async () => {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("bookmarks")
			.insert([{ card_id: cardId }])
			.single();
		if (error) {
			console.error("Error bookmarking card:", error);
			return;
		}
		console.log("Card bookmarked successfully:", data);
	};

	if (loading) {
		return (
			<div className="p-4">
				<Skeleton className="h-24 w-24 rounded-full mb-4 mx-auto" />
				<div className="flex flex-col gap-6">
					<Skeleton className="h-8 w-3/4 mx-auto" />
					<Skeleton className="h-6 w-1/2 mx-auto" />
					<Skeleton className="h-6 w-1/3 mx-auto" />
					<Skeleton className="h-6 w-2/3 mx-auto" />
				</div>
			</div>
		);
	}

	if (!card) {
		return <p className="text-center text-red-500">Card not found</p>;
	}

	return (
		<div className="z-0">
			<div className="flex flex-col gap-6">
				{card.companyLogo && (
					<Image
						src={
							typeof card.companyLogo === "string"
								? card.companyLogo
								: URL.createObjectURL(card.companyLogo)
						}
						alt="Company Logo"
						width={500}
						height={500}
						className="aspect-square object-cover z-0"
					/>
				)}
				<div className="flex flex-col gap-1">
					{card.companyPosition && (
						<p className="text-gray-600">{card.companyPosition}</p>
					)}
					<h1 className="text-4xl font-bold">
						{card.firstName} {card.lastName}
					</h1>
					{card.phone && <p className="text-gray-600">Phone: {card.phone}</p>}
					{card.email && <p className="text-gray-600">Email: {card.email}</p>}
				</div>

				<div className="flex flex-col gap-1">
					{card.companyName && (
						<h2 className="text-2xl font-bold">{card.companyName}</h2>
					)}
					{card.companyDescription && (
						<p className="text-gray-600">{card.companyDescription}</p>
					)}
					{card.companyWebsite && (
						<a
							href={card.companyWebsite}
							className="text-blue-500 hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{card.companyWebsite}
						</a>
					)}
				</div>
				<div className="flex gap-4">
					{card.facebook && (
						<Button
							className="bg-blue-400 text-white"
							isIconOnly
							onClick={() => window.open("https://facebook.com/" + card.facebook, "_blank")}
						>
							<FacebookIcon size={24} />
						</Button>
					)}
					{card.instagram && (
						<Button
							className="bg-orange-700 text-white"
							isIconOnly
							onClick={() => window.open("https://instagram.com/" + card.instagram, "_blank")}
						>
							<InstagramIcon size={24} />
						</Button>
					)}
					{card.linkedin && (
						<Button
							className="bg-blue-900 text-white"
							isIconOnly
							onClick={() => window.open("https://www.linkedin.com/in/" + card.linkedin, "_blank")}
						>
							<LinkedinIcon size={24} />
						</Button>
					)}
				</div>
				<div className="flex gap-4">
					<Button variant="flat" color="primary" onClick={handleBookmark}>
						<BookmarkIcon size={20} />
						Save to bookmarks
					</Button>
					<Button
						variant="flat"
						color="secondary"
						isIconOnly
						onClick={() => window.print()}
					>
						Print
					</Button>
				</div>
			</div>
		</div>
	);
}

CardPage.getInitialProps = async (context: NextPageContext) => {
	const supabase = createClient(context);

	const { card: cardId } = context.query as { card?: string };

	console.log("getInitialProps - Card ID from URL:", cardId);

	if (!cardId || typeof cardId !== "string") {
		console.log("Card ID is invalid or missing");
		return { card: null, cardId: null };
	}

	try {
		const { data, error } = await supabase
			.from("cards")
			.select("*")
			.eq("id", cardId)
			.single();

		if (error) {
			console.error("Error fetching card:", error);
			return { card: null, cardId };
		}

		console.log("Fetched card data:", data);

		if (!data) {
			console.log("No data found for card ID:", cardId);
			return { card: null, cardId };
		}

		return {
			card: data,
			cardId: cardId,
		};
	} catch (err) {
		console.error("Unexpected error:", err);
		return { card: null, cardId: null };
	}
};
