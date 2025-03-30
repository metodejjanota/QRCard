import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";

type CardData = {
	id: string;
	email: string;
};

export default function CardPage({ card }: { card: CardData | null }) {
	if (!card) {
		return <p className="text-center text-red-500">Card not found</p>;
	}

	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="w-full h-full flex justify-center items-center aspect-square bg-accent rounded-2xl"></div>
			<div className="w-full h-full flex flex-col gap-12 text-center">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">{card.email}</h1>
					<p className="text-lg opacity-70">This is the business card.</p>
				</div>
			</div>
		</div>
	);
}

CardPage.getInitialProps = async (context: NextPageContext) => {
	const supabase = createClient(context);
	const { card } = context.query as { card?: string };

	if (!card || typeof card !== "string") {
		return { card: null };
	}

	const { data, error } = await supabase
		.from("users")
		.select("id, email")
		.eq("id", card)
		.single();

	if (error || !data) {
		return { card: null };
	}

	return { card: data };
};
