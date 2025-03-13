import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-8 h-screen justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-black">Wellcome to Travel Ready</h1>
				<p className="text-sm">
					This is a travel app that helps you plan your trips.
				</p>
			</div>
			<Image src="/map.svg" width={700} height={500} alt="Map" />
			<div className="flex flex-col gap-4">
				<button
					className="btn btn-primary w-full"
					onClick={() => router.push("/auth")}
				>
					Start planning your trip!
				</button>
			</div>
		</div>
	);
}
