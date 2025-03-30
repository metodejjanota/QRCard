import { useRouter } from "next/router";
import { useState } from "react";
import { createClient } from "@/lib/supabase/component";
import Image from "next/image";

const Login = () => {
	const router = useRouter();
	const supabase = createClient();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function logIn() {
		setIsLoading(true);

		if (!email || !password) {
			return;
		}

		if (!email.includes("@")) {
			return;
		}

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			if (data.user) {
				router.push("/protected/dashboard");
			}
		} catch (error) {
			console.error(error);
			// Optionally show error to user
		} finally {
			setIsLoading(false);
		}
	}

	async function signUp() {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error(error);
		}

		logIn();
	}

	return (
		<div className="flex flex-col gap-8 h-screen ">
			<Image
				src="/login.svg"
				width={250}
				height={250}
				alt="Map"
				className="mx-auto"
			/>
			<form className="flex flex-col gap-0">
				<h1 className="text-2xl font-black">Wellcome to QRCard</h1>
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

				<div className="flex flex-col gap-2">
					<button
						className="btn btn-primary w-full mt-6"
						onClick={e => {
							e.preventDefault();
							logIn();
						}}
						disabled={isLoading}
					>
						{isLoading ? "Logging in..." : "Login"}
					</button>
					<button
						className="btn btn-outline w-full"
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
