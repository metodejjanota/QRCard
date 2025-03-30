const testData = [
	{
		id: "1",
		firstName: "John",
		lastName: "Doe",
		companyName: "Tech Corp",
		companyPosition: "Software Engineer",
		companyDescription:
			"Leading tech company specializing in software development.",
		companyLogo:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/768px-LEGO_logo.svg.png",
	},
	{
		id: "2",
		firstName: "Jane",
		lastName: "Smith",
		companyName: "Design Studio",
		companyPosition: "Graphic Designer",
		companyDescription:
			"Creative design studio focused on branding and marketing.",
	},
	{
		id: "3",
		firstName: "Alice",
		lastName: "Johnson",
		companyName: "Marketing Agency",
		companyPosition: "Marketing Manager",
		companyDescription:
			"Agency providing innovative marketing solutions for businesses.",
	},
	{
		id: "4",
		firstName: "Bob",
		lastName: "Brown",
		companyName: "Finance Group",
		companyPosition: "Financial Analyst",
		companyDescription:
			"Finance group offering investment and financial advisory services.",
		companyLogo:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/768px-LEGO_logo.svg.png",
	},
];

import { ICard } from "@/lib/types/card";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/react";
import { useQRCode } from "next-qrcode";

const Bookmarks = () => {
	const router = useRouter();
	const { Canvas } = useQRCode();
	const [bookmarksList, setBookmarksList] = useState<ICard[]>(testData);

	const deleteBookmark = (id: string) => {
		setBookmarksList(prev => prev.filter(bookmark => bookmark.id !== id));
		// + odstrani bookmark i z db
	};

	const openBookmark = (id: string) => {
		router.push(`/card/${id}`);
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{bookmarksList.map(bookmark => {
					return (
						<Card className="p-2 cursor-pointer relative" key={bookmark.id}>
							<CardBody
								className="flex flex-row gap-4"
								onClick={() => openBookmark(bookmark.id)}
							>
								{bookmark.companyLogo === "" ||
								bookmark.companyLogo === undefined ? (
									<Canvas
										text={"localhost:3000/card/" + bookmark.id}
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
										src={bookmark.companyLogo}
										width={100}
										height={100}
									/>
								)}
								<div className="flex flex-col justify-center">
									<p className="text-tiny uppercase font-bold">
										{bookmark.companyName}
									</p>
									<small className="text-default-500">
										{bookmark.companyPosition}
									</small>
									<h4 className="font-bold text-large">
										{bookmark.firstName} {bookmark.lastName}
									</h4>
									<p className="text-default-500 text-tiny">
										{bookmark.companyDescription}
									</p>
								</div>
							</CardBody>
							<CardFooter className="flex justify-between absolute bottom-0 left-0 right-0 p-2">
								<Button isIconOnly onClick={() => deleteBookmark(bookmark.id)}>
									<Trash2Icon size={16} />
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default Bookmarks;
