import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchUser = async () => {
			const { data } = await supabase.auth.getUser();
			setIsAuthenticated(!!data?.user);
			setLoading(false);
		};

		fetchUser();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_, session) => {
				setIsAuthenticated(!!session?.user);
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	return { isAuthenticated, loading };
}
