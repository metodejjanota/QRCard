import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import AppUrlListener from "@/components/appUrlListener";
import { ToastProvider } from "@/components/ui/toast";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<Layout>
				<AppUrlListener />
				<Component {...pageProps} />
			</Layout>
		</ToastProvider>
	);
}
