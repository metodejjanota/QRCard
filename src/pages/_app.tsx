import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import AppUrlListener from "@/components/appUrlListener";
import { ToastProvider } from "@/components/ui/toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export default function App({ Component, pageProps }: AppProps) {
	const supabase = createClientComponentClient();

	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<ToastProvider>
				<Layout>
					<AppUrlListener />
					<Component {...pageProps} />
				</Layout>
			</ToastProvider>
		</SessionContextProvider>
	);
}
