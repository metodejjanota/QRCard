"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { App, URLOpenListenerEvent } from "@capacitor/app";

const AppUrlListener: React.FC = () => {
	const router = useRouter();

	useEffect(() => {
		const handleUrlOpen = (event: URLOpenListenerEvent) => {
			const slug = event.url.split(".app").pop();
			if (slug) {
				router.push(slug);
			}
		};

		App.addListener("appUrlOpen", handleUrlOpen).then(listener => {
			return () => {
				listener.remove();
			};
		});
	}, [router]);

	return null;
};

export default AppUrlListener;
