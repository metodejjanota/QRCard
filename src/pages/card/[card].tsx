import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";
import { ICard } from "@/lib/types/card";
import { Image, Skeleton } from "@heroui/react";

export default function CardPage({
	card,
	cardId,
}: {
	card: ICard | null;
	cardId: string | null;
}) {
	if (!card) {
		return <p className="text-center text-red-500">Card not found</p>;
	}

	return (
		<div>
			{card.companyLogo && (
				<div className="flex justify-center items-center">
					<Image
						src={card.companyLogo}
						alt="Company Logo"
						width={100}
						height={100}
						className="rounded-full mb-4"
					/>
				</div>
			)}
			<div className="p-4">
				<h2 className="text-xl font-semibold">Card ID: {card.id}</h2>
				<p className="text-gray-700">Name: {card.email}</p>
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
