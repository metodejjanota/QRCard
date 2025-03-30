import { ICard } from "@/lib/types/card";
import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";

const EditCard = () => {
	const [card, setCard] = useState<ICard>({
		_id: "",
		/* personal */
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		/* company */
		companyLogo: "",
		companyName: "",
		companyPosition: "",
		companyWebsite: "",
		companyDescription: "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			alert("Card saved successfully!");
		} catch (error) {
			console.error("Error saving card:", error);
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
						required
						description=""
						label="First Name"
						labelPlacement="inside"
						type="text"
						value={card.firstName}
						onChange={e => setCard({ ...card, firstName: e.target.value })}
						placeholder="First Name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						required
						description=""
						label="Last Name"
						labelPlacement="inside"
						type="text"
						value={card.lastName}
						onChange={e => setCard({ ...card, lastName: e.target.value })}
						placeholder="Last Name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Email"
						labelPlacement="inside"
						type="email"
						value={card.email}
						onChange={e => setCard({ ...card, email: e.target.value })}
						placeholder="Email"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Phone"
						labelPlacement="inside"
						type="text"
						value={card.phone}
						onChange={e => setCard({ ...card, phone: e.target.value })}
						placeholder="Phone"
						className="w-full"
						disabled={loading}
					/>
				</div>
				<div className="w-full h-full flex flex-col gap-2">
					<h2 className="text-2xl font-bold">Company Informations</h2>
					<Input
						description=""
						required
						label="Company Name"
						labelPlacement="inside"
						type="text"
						value={card.companyName}
						onChange={e => setCard({ ...card, companyName: e.target.value })}
						placeholder="Company Name"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Logo"
						labelPlacement="inside"
						type="file"
						value={card.companyLogo}
						onChange={e => setCard({ ...card, companyLogo: e.target.value })}
						placeholder="Company Logo URL"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Position"
						labelPlacement="inside"
						type="text"
						value={card.companyPosition}
						onChange={e =>
							setCard({ ...card, companyPosition: e.target.value })
						}
						placeholder="Company Position"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Website"
						labelPlacement="inside"
						type="text"
						value={card.companyWebsite}
						onChange={e => setCard({ ...card, companyWebsite: e.target.value })}
						placeholder="Company Website"
						className="w-full"
						disabled={loading}
					/>
					<Input
						description=""
						label="Company Description"
						labelPlacement="inside"
						type="text"
						value={card.companyDescription}
						onChange={e =>
							setCard({ ...card, companyDescription: e.target.value })
						}
						placeholder="Company Description"
						className="w-full"
						disabled={loading}
					/>
				</div>
				<div className="w-full h-full flex gap-2">
					<Button
						variant="solid"
						color="danger"
						onClick={() => {
							setCard({
								_id: "",
								firstName: "",
								lastName: "",
								phone: "",
								email: "",
								companyLogo: "",
								companyName: "",
								companyPosition: "",
								companyWebsite: "",
								companyDescription: "",
							});
						}}
						className="w-full"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						className="w-full"
						disabled={loading}
					>
						{loading ? "Saving..." : "Save"}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default EditCard;
