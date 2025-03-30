"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { App, URLOpenListenerEvent } from "@capacitor/app";

const AppUrlListener: React.FC = () => {
	const router = useRouter();

	useEffect(() => {
		const handleUrlOpen = (event: URLOpenListenerEvent) => {
			try {
				const url = new URL(event.url);
				const path = url.pathname;

				if (path && path !== "/") {
					router.push(path);
				}
			} catch (error) {
				console.error("Error parsing URL:", error);
			}
		};

		const addListener = async () => {
			const listener = await App.addListener("appUrlOpen", handleUrlOpen);
			return () => listener.remove();
		};

		addListener();
	}, [router]);

	return null;
};

export default AppUrlListener;
