import { ICard } from "@/lib/types/card";
import { Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { createClient } from "@/lib/supabase/server-props";

const Bookmarks = () => {
    const router = useRouter();
    const [bookmarksList, setBookmarksList] = useState<ICard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const supabase = createClient();

    const fetchBookmarks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("bookmarks")
            .select("*");

        if (error) {
            console.error("Error fetching bookmarks:", error);
        } else {
            setBookmarksList(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const deleteBookmark = async (id: string) => {
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting bookmark:", error);
        } else {
            setBookmarksList(prev => prev.filter(bookmark => bookmark._id !== id));
        }
    };

    const openBookmark = (id: string) => {
        const bookmark = bookmarksList.find(b => b._id === id);
        if (bookmark) {
            router.push(`/card/${id}`);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                onClick={e => {
                                    e.stopPropagation();
                                    deleteBookmark(bookmark._id);
                                }}
                            />
                        </div>
                        <Image
                            src={bookmark.companyLogo || "/images/default.png"}
                            alt={bookmark.copmanyName}
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                        <div className="flex flex-col gap-2 mt-4 items-start">
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