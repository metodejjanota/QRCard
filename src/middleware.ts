import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "./lib/supabaseClient";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const { data } = await supabase.auth.getSession();
	const isAuthenticated = !!data.session;

	if (req.nextUrl.pathname.startsWith("/protected") && !isAuthenticated) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return res;
}

export const config = {
	matcher: "/protected/:path*",
};
