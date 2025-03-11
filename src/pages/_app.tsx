import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import AppUrlListener from "@/components/appUrlListener";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<AppUrlListener />
			<Component {...pageProps} />
		</Layout>
	);
}
