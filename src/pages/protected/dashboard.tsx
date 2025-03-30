import type { User } from "@supabase/supabase-js";
import type { NextPageContext } from "next";
import { createClient } from "@/lib/supabase/server-props";
import { useQRCode } from "next-qrcode";
import { useState, useEffect, useRef } from "react";
import { Share } from "@capacitor/share";

export default function PrivatePage({ user }: { user: User }) {
	const { Canvas } = useQRCode();
	const [qrUrl, setQrUrl] = useState<string | null>(
		"https://metodejjanota.space"
	);
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
			if (qrDataUrl) {
				await Share.share({
					title: "My QRCard",
					text: "Check out my QRCard!",
					url: qrUrl || undefined,
					dialogTitle: "Share with friends or save to device",
					files: [qrDataUrl],
				});
			} else {
				await Share.share({
					title: "My QRCard",
					text: "Check out my QRCard!",
					url: qrUrl || undefined,
					dialogTitle: "Share with friends or save to device",
				});
			}
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
								width: 50,
								x: 25,
								y: 275,
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
				<p className="text-sm opacity-70">
					To share your QRCard,{" "}
					<span
						onClick={() => {
							share();
						}}
						className="text-accent cursor-pointer"
						style={{ textDecoration: "underline" }}
					>
						click here
					</span>
				</p>
			</div>
		</div>
	);
}

PrivatePage.getInitialProps = async (context: NextPageContext) => {
	const supabase = createClient(context);
	const { data, error } = await supabase.auth.getUser();
	if (error || !data) {
		if (context.res) {
			context.res.writeHead(302, { Location: "/" });
			context.res.end();
		} else {
			document.location.pathname = "/";
		}
		return { user: null };
	}
	return {
		user: data.user,
	};
};
