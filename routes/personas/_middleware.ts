// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { State } from "@/routes/_middleware.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { redirect } from "@/utils/http.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { Persona } from "../../utils/db/db_persona.ts";

export interface PersonasState extends State {
  sessionId: string;
  user: User;
  personas: Persona[];
}

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<PersonasState>,
) {
  const redirectResponse = redirect("/login");

  if (!ctx.state.sessionId) return redirectResponse;
  const user = await getUserBySessionId(ctx.state.sessionId);
  if (!user) return redirectResponse;
  ctx.state.user = user;
  ctx.state.personas = [];
  return await ctx.next();
}
