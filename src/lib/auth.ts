import { supabase } from "./supabaseClient";

type AuthResponse = { error?: string };

export const signUp = async (
	email: string,
	password: string
): Promise<AuthResponse> => {
	const { error } = await supabase.auth.signUp({ email, password });
	return error ? { error: error.message } : {};
};

export const signIn = async (
	email: string,
	password: string
): Promise<AuthResponse> => {
	const { error } = await supabase.auth.signInWithPassword({ email, password });
	return error ? { error: error.message } : {};
};

export const signOut = async (): Promise<AuthResponse> => {
	const { error } = await supabase.auth.signOut();
	return error ? { error: error.message } : {};
};
