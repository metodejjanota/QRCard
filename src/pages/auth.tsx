import { useRouter } from "next/router";
import { useState } from "react";
import { createClient } from "@/lib/supabase/component";
import Image from "next/image";

const Login = () => {
	const router = useRouter();
	const supabase = createClient();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function logIn() {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error(error);
		}
		router.push("/protected/test");
	}

	async function signUp() {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error(error);
		}
		router.push("/");
	}

	return (
		<div className="flex flex-col gap-8 h-screen justify-center">
			<Image src="/login.svg" width={700} height={500} alt="Map" />
			<form className="flex flex-col gap-1">
				<h1 className="text-2xl font-black">Wellcome to Travel Ready</h1>
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

				<div>
					<button
						className="btn btn-primary w-full mt-6"
						onClick={e => {
							e.preventDefault();
							logIn();
						}}
					>
						Login
					</button>
					<button
						className="btn btn-outline w-full mt-6"
						onClick={e => {
							e.preventDefault();
							signUp();
						}}
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
