import { useRouter } from "next/router";
import { useState } from "react";
import { createClient } from "@/lib/supabase/component";
import { Form, Input, Button } from "@heroui/react";
import Image from "next/image";

const Login = () => {
	const router = useRouter();
	const supabase = createClient();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

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
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
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
			<Form className="flex flex-col gap-6">
				<div>
					<h1 className="text-2xl font-black">Wellcome to QRCard</h1>

					<p className="text-default-500">
						Please log in to your account or create a new one.
					</p>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Input
						label="Email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="Email"
						className="w-full"
						disabled={isLoading}
					/>
					<Input
						label="Password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder="Password"
						className="w-full"
						disabled={isLoading}
					/>
				</div>
				<div className="flex gap-2 w-full">
					<Button
						type="submit"
						className="w-full"
						onClick={e => {
							e.preventDefault();
							logIn();
						}}
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Log In"}
					</Button>
					<Button
						type="button"
						className="w-full"
						onClick={e => {
							e.preventDefault();
							signUp();
						}}
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Create Account"}
					</Button>
				</div>
				{error && (
					<p className="text-red-500 text-sm text-center w-full">{error}</p>
				)}
			</Form>
		</div>
	);
};

export default Login;
