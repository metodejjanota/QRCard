import type { User } from "@supabase/supabase-js";
import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";
import { useQRCode } from "next-qrcode";
import { useState, useEffect, useRef } from "react";
import { Share } from "@capacitor/share";
import { ICard } from "@/lib/types/card";
import { Button } from "@heroui/react";
import { CheckCircleIcon, ShareIcon } from "lucide-react";

export default function Dashboard({ user, card }: { user: User; card: ICard }) {
	const { Canvas } = useQRCode();
	const qrUrl = "http://localhost:3000/card/" + card.id;
	const canvasRef = useRef<HTMLDivElement>(null);
	const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			setTimeout(() => {
				const canvas = canvasRef.current?.querySelector("canvas");
				if (canvas) {
					setQrDataUrl(canvas.toDataURL("image/png"));
				}
			}, 100);
		}
	}, [canvasRef]);

	async function share() {
		try {
			await Share.share({
				title: "My QRCard",
				text: "Check out my QRCard!",
				url: qrUrl,
				dialogTitle: "Share with friends or save to device",
			});
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				return;
			}
			console.error("Error sharing:", error);
		}
	}

	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="w-full h-full flex justify-center items-center aspect-square rounded-2xl">
				<div ref={canvasRef}>
					<Canvas
						text={qrUrl || ""}
						options={{
							errorCorrectionLevel: "L",
							margin: 0,
							scale: 6,
							width: 350,
							color: {
								dark: "#000000",
								light: "#ffffff00",
							},
						}}
						logo={{
							src: "/logo.png",
							options: {
								width: 55,
							},
						}}
					/>
				</div>
			</div>
			<div className="w-full h-full flex flex-col gap-12 text-center">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">{user.email || "user"}</h1>
					<p className="text-lg opacity-70">
						Welcome to your private page. You are logged in.
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant="solid"
						onClick={() => {
							window.location.href = "/card/" + card.id;
						}}
						className="w-full h-12"
					>
						<CheckCircleIcon size={20} strokeWidth={2} />
						Check Card
					</Button>
					<Button
						variant="solid"
						color="primary"
						onClick={share}
						className="w-full h-12"
					>
						<ShareIcon size={20} strokeWidth={2} />
						Share Card
					</Button>
				</div>
			</div>
		</div>
	);
}

Dashboard.getInitialProps = async (context: NextPageContext) => {
	const supabase = createClient(context);

	const { data: userData, error: userError } = await supabase.auth.getUser();
	if (userError || !userData) {
		if (context.res) {
			context.res.writeHead(302, { Location: "/" });
			context.res.end();
		} else {
			document.location.pathname = "/";
		}
		return { user: null };
	}

	const user = userData.user;

	const { data: cardData, error: cardError } = await supabase
		.from("cards")
		.select("*")
		.eq("user_id", user.id)
		.single();

	if (cardError || !cardData) {
		const { data: newCard, error: createError } = await supabase
			.from("cards")
			.insert([
				{
					user_id: user.id,
					email: user.email,
				},
			])
			.select()
			.single();

		if (createError) {
			console.error("Error creating card:", createError);
			return {
				user,
			};
		}

		return {
			user,
			card: newCard,
		};
	}

	return {
		user,
		card: cardData,
	};
};
