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
					<div
						key={bookmark._id}
						className="card bg-base-100 card-sm shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out p-4 rounded-lg flex flex-row gap-4 cursor-pointer"
						onClick={() => openBookmark(bookmark._id)}
					>
						<div className="absolute top-2 right-2 cursor-pointer m-2">
							<Trash2Icon
								size={20}
								strokeWidth={2}
								className="opacity-70 cursor-pointer"
								onClick={() => deleteBookmark(bookmark._id)}
							/>
						</div>
						<Image
							src={bookmark.companyLogo || "/images/default.png"}
							alt={bookmark.copmanyName}
							width={100}
							height={100}
							className="rounded-lg"
						/>
						<div className="flex flex-col gap-2 mt-4  items-start">
							<h2>{bookmark.copmanyName}</h2>
							<p>{bookmark.description}</p>
							<a
								href={bookmark.website}
								target="_blank"
								rel="noopener noreferrer"
							>
								Visit Website
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Bookmarks;
