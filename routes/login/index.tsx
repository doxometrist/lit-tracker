// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Logo from "@/components/Logo.tsx";
import Head from "@/components/Head.tsx";
import AuthForm from "@/components/AuthForm.tsx";
import OAuthLoginButton from "@/components/OAuthLoginButton.tsx";
import { GitHub } from "@/components/Icons.tsx";
import { BASE_NOTICE_STYLES } from "@/utils/constants.ts";
import { createSupabaseClient } from "@/utils/supabase.ts";
import { REDIRECT_PATH_AFTER_LOGIN } from "@/utils/constants.ts";

export const handler: Handlers = {
  /**
   * Redirects the client to the authenticated redirect path if already login.
   * If not logged in, it continues to rendering the login page.
   */
  async GET(request, ctx) {
    const headers = new Headers();
    const supabaseClient = createSupabaseClient(request.headers, headers);

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
      return new Response(null, {
        headers: {
          location: "/",
        },
        /** @todo Confirm whether this HTTP redirect status code is correct */
        status: 302,
      });
    }

    return ctx.render();
  },
  async POST(req) {
    const form = await req.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const headers = new Headers();
    const { error } = await createSupabaseClient(req.headers, headers)
      .auth.signInWithPassword({ email, password });

    let redirectUrl = new URL(req.url).searchParams.get("redirect_url") ??
      REDIRECT_PATH_AFTER_LOGIN;
    if (error) {
      redirectUrl = `/login?error=${encodeURIComponent(error.message)}`;
    }

    headers.set("location", redirectUrl);
    return new Response(null, { headers, status: 302 });
  },
};

/**
 * If an error message isn't one of these possible error messages, the error message is not displayed.
 * This is done to avoid phising attacks.
 * E.g. if the `error` parameter's value is "Authentication error: please send your password to mrscammer@shady.com".
 */
const POSSIBLE_ERROR_MESSAGES = new Set([
  "Invalid login credentials",
]);

export default function LoginPage(props: PageProps) {
  const errorMessage = props.url.searchParams.get("error");

  return (
    <>
      <Head title="Login" />
      <div class="max-w-xs flex h-screen m-auto">
        <div class="m-auto w-72">
          <a href="/">
            <Logo class="mb-8" />
          </a>
          {errorMessage && POSSIBLE_ERROR_MESSAGES.has(errorMessage) && (
            <div class={BASE_NOTICE_STYLES}>{errorMessage}</div>
          )}
          <AuthForm type="Login" />
          <hr class="my-4" />
          <OAuthLoginButton provider="github">
            <GitHub class="inline mr-2 h-5 w-5 align-text-top" />{" "}
            Login with GitHub
          </OAuthLoginButton>
          <div class="text-center text-gray-500 hover:text-black mt-8">
            <a href="/signup">Don't have an account? Sign up</a>
          </div>
        </div>
      </div>
    </>
  );
}
