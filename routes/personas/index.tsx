// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import type { PersonasState } from "./_middleware.ts";
import {
  BUTTON_STYLES,
  DEFAULT_LIMIT,
  NOTICE_STYLES,
  PREMIUM_LIMIT,
} from "@/utils/constants.ts";
import { ComponentChild } from "preact";
import {
  createPersona,
  getPersonasByUserId,
  InitPersona,
  Persona,
} from "../../utils/db/db_persona.ts";
import OpenFormButton from "../../islands/OpenFormButton.tsx";

export const handler: Handlers<PersonasState, PersonasState> = {
  async GET(_request, ctx) {
    const personas: Persona[] = await getPersonasByUserId(ctx.state.user.id);
    ctx.state.personas = personas;

    return ctx.render({ ...ctx.state });
  },

  async POST(req, ctx) {
    const userId = ctx.state.user.id;
    const form = await req.formData();
    const name: string | undefined = form.get("name")?.toString();

    const description = form.get("description")?.toString();
    if (name === undefined || description === undefined) {
      return new Response(null, {
        status: 400,
      });
    }
    const init: InitPersona = {
      name: name,
      description: description,
    };
    createPersona(init, userId);
    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/personas");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

interface PersonaCardProps {
  persona: Persona;
  key: number;
}
function PersonaCard(props: PersonaCardProps) {
  return (
    <li class="py-4" key={`persona-${props.key}`}>
      <div class="flex flex-col flex-wrap justify-between">
        <p>
          Name: <strong>{props.persona.name}</strong>
        </p>
        <p>
          Joined:{" "}
          {props.persona.joinDate && (
            <span>{props.persona.joinDate.toLocaleString()}</span>
          )}
        </p>

        <p>Description: {props.persona.description}</p>
      </div>
      <a
        href="/"
        class={`${BUTTON_STYLES} block text-center mt-8`}
        disabled
      >
        Switch into this persona
      </a>
    </li>
  );
}

const tests: number[] = [1, 2, 3, 24, 5];

function PersonasCardsWrapper(props: { personas: Persona[] }) {
  console.log(props.personas);
  const noPersonas: boolean = props.personas.length < 1;
  if (noPersonas) {
    return (
      <h4 class="m-2 p-2">
        Nothing here! Create a new persona by clicking the button above
      </h4>
    );
  }
  return (
    <ul>
      {/* <PersonaCard persona={personas[0]} key={1}/> */}
      {/* {tests.map((n) => <li>{n}</li>)} */}
      {props.personas.map((p, i) => {
        return <PersonaCard persona={p} key={i} />;
      })}
    </ul>
  );
}

export default function PersonasPage(props: PageProps<PersonasState>) {
  const hasResetPassword = new URL(props.url).searchParams.get(
    "has_reset_password",
  );
  const personas = props.data.personas;
  const isPremium = props.data.user.isSubscribed;

  return (
    <>
      <Head title="Personas" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>
              You have {personas.length} personas out of {" "}
              {isPremium ? PREMIUM_LIMIT : DEFAULT_LIMIT} available
            </strong>
          </h1>
          <div id="form-wrapper">
            <form
              method="post"
              class="border-red-400 border-1 border-solid "
            >
              <div class="flex flex-col">
                <input
                  type="text"
                  name="name"
                  class="p-1 m-1 border-red-300 border-1 border-solid"
                />
                <label for="name">Input name</label>

                <input
                  type="text"
                  name="description"
                  class="p-1 m-1 border-red-300 border-1 border-solid"
                />
                <label for="description">Input description</label>
              </div>

              <div id="class" class="flex flex-row m-2 p-2">
                <button
                  class={`${BUTTON_STYLES} text-center mt-8`}
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  class={`${BUTTON_STYLES} text-center mt-8`}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <PersonasCardsWrapper personas={personas} />
        </div>
      </Layout>
    </>
  );
}
