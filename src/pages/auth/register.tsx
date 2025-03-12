import { useState } from "react";
import Image from "next/image";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/router";

const Register = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSignIn = async () => {
		const res = await signIn(email, password);
		if (res.error) setError(res.error);
	};
	return (
		<div className="flex flex-col gap-8 h-screen justify-center">
			<Image src="/login.svg" width={700} height={500} alt="Map" />
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSignIn();
				}}
				className="flex flex-col gap-1"
			>
				<h1 className="text-2xl font-black">Register to Travel Ready</h1>
				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">Email address</legend>
					<input
						type="email"
						className="input w-full"
						placeholder="Enter your email address"
						onChange={e => setEmail(e.target.value)}
					/>
					<p className="fieldset-label">We will never share your email.</p>
				</fieldset>
				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">Password</legend>
					<input
						type="password"
						className="input w-full"
						placeholder="Enter your password"
						onChange={e => setPassword(e.target.value)}
					/>
					<p className="fieldset-label">We will never share your password.</p>
				</fieldset>
				{error && <p className="text-red-500">{error}</p>}
				<div>
					<button className="btn btn-primary w-full mt-6">Register</button>
					<button
						className="btn btn-outline w-full mt-6"
						onClick={() => router.push("/auth/login")}
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
