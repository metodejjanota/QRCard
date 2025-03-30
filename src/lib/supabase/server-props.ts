import { NextPageContext, type GetServerSidePropsContext } from "next";
import {
	createServerClient,
	createBrowserClient,
	serializeCookieHeader,
} from "@supabase/ssr";

export function createClient(context: NextPageContext) {
	if (typeof window === "undefined" && context && context.req && context.res) {
		const { req, res } = context as unknown as GetServerSidePropsContext;

		return createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					getAll() {
						if (!req.cookies) return [];
						return Object.keys(req.cookies).map(name => ({
							name,
							value: req.cookies[name] || "",
						}));
					},
					setAll(cookiesToSet) {
						if (res && res.setHeader) {
							res.setHeader(
								"Set-Cookie",
								cookiesToSet.map(({ name, value, options }) =>
									serializeCookieHeader(name, value, options)
								)
							);
						}
					},
				},
			}
		);
	} else {
		return createBrowserClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		);
	}
}
