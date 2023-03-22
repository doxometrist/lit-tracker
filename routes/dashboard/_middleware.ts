import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createSupabaseClient } from "@/utils/supabase.ts";
import { assert } from "std/testing/asserts.ts";
import type { Session } from "@supabase/supabase-js";

export interface DashboardState {
  session: Session;
}

export function getLoginPath(redirectUrl: string) {
  const params = new URLSearchParams({ redirect_url: redirectUrl });
  return `/login?${params}`;
}

export async function handler(
  request: Request,
  ctx: MiddlewareHandlerContext<DashboardState>,
) {
  try {
    const headers = new Headers();
    const supabaseClient = createSupabaseClient(request.headers, headers);
    const { data: { session } } = await supabaseClient.auth.getSession();

    // Throws if session is `null`, causing a redirect to the login page.
    assert(session);

    ctx.state.session = session;
    const response = await ctx.next();
    /**
     * Note: ensure that a `new Response()` with a `location` header is used when performing server-side redirects.
     * Using `Response.redirect()` will throw as its headers are immutable.
     */
    headers.forEach((value, key) => response.headers.set(key, value));
    return response;
  } catch (error) {
    console.error(error);

    return new Response(null, {
      status: 302,
      headers: {
        location: getLoginPath(request.url),
      },
    });
  }
}
