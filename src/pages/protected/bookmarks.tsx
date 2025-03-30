const testData = [
	{
		_id: "1",
		firstName: "John",
		lastName: "Doe",
		companyName: "Tech Corp",
		companyPosition: "Software Engineer",
		companyDescription:
			"Leading tech company specializing in software development.",
		companyLogo: "/images/company-logo.png",
	},
	{
		_id: "2",
		firstName: "Jane",
		lastName: "Smith",
		companyName: "Design Studio",
		companyPosition: "Graphic Designer",
		companyDescription:
			"Creative design studio focused on branding and marketing.",
	},
	{
		_id: "3",
		firstName: "Alice",
		lastName: "Johnson",
		companyName: "Marketing Agency",
		companyPosition: "Marketing Manager",
		companyDescription:
			"Agency providing innovative marketing solutions for businesses.",
	},
	{
		_id: "4",
		firstName: "Bob",
		lastName: "Brown",
		companyName: "Finance Group",
		companyPosition: "Financial Analyst",
		companyDescription:
			"Finance group offering investment and financial advisory services.",
		companyLogo: "/images/company-logo.png",
	},
];

import { ICard } from "@/lib/types/card";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Link from "next/link";
import { Button } from "@heroui/react";

const Bookmarks = () => {
	const router = useRouter();
	const [bookmarksList, setBookmarksList] = useState<ICard[]>(testData);

	const deleteBookmark = (id: string) => {
		setBookmarksList(prev => prev.filter(bookmark => bookmark._id !== id));
		// + odstrani bookmark i z db
	};

	const openBookmark = (id: string) => {
		const bookmark = bookmarksList.find(b => b._id === id);
		if (bookmark) {
			router.push(`/card/${id}`);
		}
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{bookmarksList.map(bookmark => (
					<Card className="p-2">
						<CardBody className="flex flex-row gap-4">
							<Image
								alt="Card Logo"
								className="object-cover rounded-xl aspect-square"
								src={bookmark.companyLogo || "/images/default-logo.png"}
								width={150}
								height={150}
							/>
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
							<Button isIconOnly onClick={() => deleteBookmark(bookmark._id)}>
								<Trash2Icon size={16} />
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Bookmarks;
