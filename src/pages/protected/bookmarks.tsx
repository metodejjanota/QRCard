const testData = [
	{
		_id: "1",
		companyLogo: "/images/company1.png",
		copmanyName: "TechCorp",
		copmanyPosition: "Software Engineer",
		description: "Innovative tech solutions provider.",
		firstName: "John",
		lastName: "Doe",
		website: "https://techcorp.com",
		phone: "123-456-7890",
		email: "john.doe@techcorp.com",
	},
	{
		_id: "2",
		companyLogo: "/images/company2.png",
		copmanyName: "HealthPlus",
		copmanyPosition: "Product Manager",
		description: "Healthcare services and products.",
		firstName: "Jane",
		lastName: "Smith",
		website: "https://healthplus.com",
		phone: "987-654-3210",
		email: "jane.smith@healthplus.com",
	},
	{
		_id: "3",
		companyLogo: "/images/company3.png",
		copmanyName: "EduWorld",
		description: "Educational resources for all ages.",
		firstName: "Alice",
		lastName: "Johnson",
		website: "https://eduworld.com",
		email: "alice.johnson@eduworld.com",
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
									src={bookmark.companyLogo}
									width={150}
									height={150}
								/>
								<div className="flex flex-col justify-center">
								<p className="text-tiny uppercase font-bold">
									{bookmark.copmanyName}
								</p>
								<small className="text-default-500">
									{bookmark.copmanyPosition}
								</small>
								<h4 className="font-bold text-large">
									{bookmark.firstName} {bookmark.lastName}
								</h4>
								<p className="text-default-500 text-tiny">{bookmark.description}</p>
					
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
