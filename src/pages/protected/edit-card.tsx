import { ICard } from "@/lib/types/card";
import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";

export default function EditCard({ user, card }: { user: User; card: ICard }) {
	const [cardState, setCardState] = useState<ICard>({
		/* personal */
		firstName: card.firstName,
		lastName: card.lastName,
		email: card.email,
		phone: card.phone,
		/* company */
		companyLogo: card.companyLogo,
		companyName: card.companyName,
		companyPosition: card.companyPosition,
		companyWebsite: card.companyWebsite,
		companyDescription: card.companyDescription,
		/* socials */
		facebook: card.facebook,
		instagram: card.instagram,
		linkedin: card.linkedin,
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		setLoading(true);

		e.preventDefault();
		try {
			const supabase = createClient();
			const { error } = await supabase
				.from("cards")
				.update(cardState)
				.eq("user_id", user.id);

			if (error) {
				throw error;
			}

			alert("Card saved successfully!");
		} catch (error) {
			console.error("Error saving card:", error);
			alert("Failed to save card. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Form
				className="w-full h-full flex flex-col gap-6"
				onSubmit={handleSubmit}
			>
				<div className="w-full h-full flex flex-col gap-2 z-0">
					<h2 className="text-2xl font-bold">My Informations</h2>
					<Input
						description=""
						label="First Name"
						labelPlacement="inside"
						type="text"
						value={cardState.firstName}
						onChange={e =>
							setCardState({ ...cardState, firstName: e.target.value })
						}
						placeholder="First Name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Last Name"
						labelPlacement="inside"
						type="text"
						value={cardState.lastName}
						onChange={e =>
							setCardState({ ...cardState, lastName: e.target.value })
						}
						placeholder="Last Name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						isRequired
						required
						description=""
						label="Email"
						labelPlacement="inside"
						type="email"
						value={cardState.email}
						onChange={e =>
							setCardState({ ...cardState, email: e.target.value })
						}
						placeholder="Email"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Phone"
						labelPlacement="inside"
						type="tel"
						value={cardState.phone}
						onChange={e =>
							setCardState({ ...cardState, phone: e.target.value })
						}
						placeholder="Phone"
						className="w-full"
						disabled={loading}
					/>
				</div>
				<div className="w-full h-full flex flex-col gap-2">
					<h2 className="text-2xl font-bold">Company Informations</h2>
					<Input
						description=""
						label="Company Name"
						labelPlacement="inside"
						type="text"
						value={cardState.companyName}
						onChange={e =>
							setCardState({ ...cardState, companyName: e.target.value })
						}
						placeholder="Company Name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Logo"
						labelPlacement="inside"
						type="file"
						value={cardState.companyLogo}
						onChange={e =>
							setCardState({ ...cardState, companyLogo: e.target.value })
						}
						placeholder="Company Logo URL"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Position"
						labelPlacement="inside"
						type="text"
						value={cardState.companyPosition}
						onChange={e =>
							setCardState({ ...cardState, companyPosition: e.target.value })
						}
						placeholder="Company Position"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Website"
						labelPlacement="inside"
						type="url"
						value={cardState.companyWebsite}
						onChange={e =>
							setCardState({ ...cardState, companyWebsite: e.target.value })
						}
						placeholder="Company Website"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Description"
						labelPlacement="inside"
						type="text"
						value={cardState.companyDescription}
						onChange={e =>
							setCardState({ ...cardState, companyDescription: e.target.value })
						}
						placeholder="Company Description"
						className="w-full"
						disabled={loading}
					/>
				</div>
				<div className="w-full h-full flex flex-col gap-2">
					<h2 className="text-2xl font-bold">Social Links</h2>
					<Input
						description=""
						label="Facebook"
						labelPlacement="inside"
						value={cardState.facebook}
						onChange={e =>
							setCardState({ ...cardState, facebook: e.target.value })
						}
						startContent={
							<div className="pointer-events-none flex items-center">
								<span className="text-default-400 text-small">
									https://facebook.com/
								</span>
							</div>
						}
						type="text"
						placeholder="profile-name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Instagram"
						labelPlacement="inside"
						value={cardState.instagram}
						onChange={e =>
							setCardState({ ...cardState, instagram: e.target.value })
						}
						startContent={
							<div className="pointer-events-none flex items-center">
								<span className="text-default-400 text-small">
									https://instagram.com/
								</span>
							</div>
						}
						type="text"
						placeholder="profile-name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="LinkedIn"
						labelPlacement="inside"
						startContent={
							<div className="pointer-events-none flex items-center">
								<span className="text-default-400 text-small">
									https://linkedin.com/in/
								</span>
							</div>
						}
						type="text"
						value={cardState.linkedin}
						onChange={e =>
							setCardState({ ...cardState, linkedin: e.target.value })
						}
						placeholder="profile-name"
						className="w-full"
						disabled={loading}
					/>
				</div>

				<Button
					color="primary"
					type="submit"
					className="w-full"
					disabled={loading}
				>
					{loading ? "Saving..." : "Save"}
				</Button>
			</Form>
		</div>
	);
}

EditCard.getInitialProps = async (context: NextPageContext) => {
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
