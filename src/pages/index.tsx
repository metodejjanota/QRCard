import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col items-center gap-8 h-[75vh] justify-center">
			<Image src="/map.svg" width={700} height={500} alt="Map" />
		</div>
	);
}
