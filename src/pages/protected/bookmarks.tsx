import type { User } from "@supabase/supabase-js";
import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Bookmarks({ user, bookmarks }: { user: User; bookmarks: any[] }) {
    const router = useRouter();
    const [bookmarksList, setBookmarksList] = useState(bookmarks);
    const supabase = createClient();

    const deleteBookmark = async (id: string) => {
        const { error } = await supabase.from("bookmarks").delete().eq("id", id);
        if (error) {
            console.error("Error deleting bookmark:", error);
        } else {
            setBookmarksList((prev) => prev.filter((bookmark) => bookmark.id !== id));
        }
    };

    const openBookmark = (id: string) => {
        router.push(`/card/${id}`);
    };

    return (
        <div>
            {bookmarksList.length === 0 ? (
                <div className="text-center text-gray-500">You have no bookmarks.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookmarksList.map((bookmark) => (
                        <div
                            key={bookmark.id}
                            className="card bg-base-100 card-sm shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out p-4 rounded-lg flex flex-row gap-4 cursor-pointer"
                            onClick={() => openBookmark(bookmark.cards.id)}
                        >
                            <div className="absolute top-2 right-2 cursor-pointer m-2">
                                <Trash2Icon
                                    size={20}
                                    strokeWidth={2}
                                    className="opacity-70 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteBookmark(bookmark.id);
                                    }}
                                />
                            </div>
                            <Image
                                src={bookmark.cards.companyLogo || "/images/default.png"}
                                alt={bookmark.cards.companyName}
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                            <div className="flex flex-col gap-2 mt-4 items-start">
                                <h2>{bookmark.cards.companyName}</h2>
                                <p>{bookmark.cards.description}</p>
                                <a href={bookmark.cards.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Bookmarks.getInitialProps = async (context: NextPageContext) => {
    const supabase = createClient(context);
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        if (context.res) {
            context.res.writeHead(302, { Location: "/" });
            context.res.end();
        } else {
            document.location.pathname = "/";
        }
        return { user: null, bookmarks: [] };
    }

    const { data: bookmarks, error: bookmarksError } = await supabase
        .from("bookmarks")
        .select("cards(*)")
        .eq("user_id", user.id);

    if (bookmarksError) {
        console.error("Error fetching bookmarks:", bookmarksError);
    }

    console.log("Bookmarks:", bookmarks);

    return {
        user,
        bookmarks: bookmarks || [],
    };
};
