import { Html, Head, Main, NextScript } from "next/document";
import { HeroUIProvider } from "@heroui/react";

export default function Document() {
	return (
		<Html lang="en" className="light">
			<Head />
			<body className="antialiased">
				<HeroUIProvider>
					<Main />
					<NextScript />
				</HeroUIProvider>
			</body>
		</Html>
	);
}
