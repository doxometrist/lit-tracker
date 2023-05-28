# Deno CultKit

> Warning: this project is in beta. Design, workflows, and user accounts are
> subject to change.

todo discord link

Deno CultKit is an open-sourced, highly performant
template for building your Cult quickly and easily.

## Features

- [No build step](https://deno.com/blog/you-dont-need-a-build-step#non-building-with-deno-and-fresh)
- Deno's built-in [formatter](https://deno.land/manual/tools/formatter),
  [linter](https://deno.land/manual/tools/linter) and
  [test runner](https://deno.land/manual/basics/testing) and TypeScript support.
- Database management and user authentication with
  [Deno KV](https://deno.com/manual/runtime/kv), which provides zero config
  durable data storage. _Prefer using Supabase for data storage?
- Billing management with [Alchemy](https://www.alchemy.com/).
- [Fresh](https://fresh.deno.dev/) as the web framework and
  [Tailwind CSS](https://tailwindcss.com/) as the CSS framework.


## Getting Started Locally

### Prerequisites

- [Deno](https://deno.com/manual/getting_started/installation)
- [Docker](https://docs.docker.com/engine/install/)
- [Git](https://github.com/git-guides/install-git)
- [A free Alchemy account](https://www.alchemy.com/)

### Setup the repo

1. Clone the repo:

```bash
git clone https://github.com/denoland/saaskit.git
cd saaskit
```

2. Create a `.env` file to store environmental variables:

```
cp .example.env .env
```

### Auth (OAuth)

1. [Register a new GitHub OAuth application](https://github.com/settings/applications/new)
   with the following values:

- `Application name` = a name of your own choosing
- `Homepage URL` = `http://localhost:8000`
- `Authorization callback URL` = `http://localhost:8000/callback`

1. Once registered, copy the `Client ID` value to the `GITHUB_CLIENT_ID` value
   in your `.env` file.
1. Click `Generate a new client secret` and copy the resulting client secret to
   the `GITHUB_CLIENT_SECRET` environment variable in your `.env` file.

### Payments and Subscriptions (Stripe)

1. Copy your Stripe secret key as `STRIPE_SECRET_KEY` into your `.env` file. We
   recommend using the test key for your development environment.
2. Run `deno task init:stripe` and follow the instructions. This automatically
   creates your "Premium tier" product and configures the Stripe customer
   portal.

> Note: go to [tools/init_stripe.ts](tools/init_stripe.ts) if you'd like to
> learn more about how the `init:stripe` task works.

3. Listen locally to Stripe events:

```
stripe listen --forward-to localhost:8000/api/stripe-webhooks --events=customer.subscription.created,customer.subscription.deleted
```

4. Copy the webhook signing secret to [.env](.env) as `STRIPE_WEBHOOK_SECRET`.

### Running the Server

Finally, start the server by running:

```
deno task start
```

Go to [http://localhost:8000](http://localhost:8000) to begin playing with your
new Cult app.

> Note: You can use
> [Stripe's test credit cards](https://stripe.com/docs/testing) to make test
> payments while in Stripe's test mode.

## Customization

### Global Constants

The [utils/constants.ts](utils/constants.ts) file includes global values used
across various aspects of the codebase. Update these values according to your
needs.

### Blog

To create a new blog post, create a Markdown (`.md`) file within
[`/data/posts/`](data/posts) with the filename as the slug. E.g.
`/data/blog/hello-there.md` will correspond to the `/blog/hello-there` route.
See [`/data/posts/`](data/posts) for examples.

Post properties are to be added to the starting Front Matter section of the
Markdown file. See the `Post` interface in [`/utils/posts.ts`](utils/posts.ts)
for a full list of properties and their types.

### Themes

You can customize theme options such as spacing, color, etc. By default, Deno
CultKit comes with `primary` and `secondary` colors predefined within
`twind.config.ts`. Change these values to match your desired color scheme.

## Deploying to Production

This section assumes that a
[local development environment](#getting-started-locally) has been set up.

### Authentication (OAuth)

1. [Change your OAuth app settings](https://github.com/settings/developers) to
   the following:

- `Homepage URL` = `https://{{ YOUR DOMAIN }}`
- `Authorization callback URL` = `http://{{ YOUR DOMAIN }}/callback`

### Payments (Alchemy)

todo 

### Alchemy Production Environmental Variables

todo
 
## Contributing

When submitting a pull request, please follow the
[Deno Style Guide](https://deno.land/manual/references/contributing/style_guide).

Before submitting, run the following to check the formatting, linting, licenses,
and types and run tests in one hit:

```
deno task ok
```

## Goals and Philosophy

For the user, the website should be fast, secure and have a design with clear
intent. Additionally, the HTML should be well-structured and indexable by search
engines. The defining metrics for these goals are:

- A perfect [PageSpeed Insights](https://pagespeed.web.dev/) score.
- Fully valid HTML, as measured by
  [W3C's Markup Validation Service](https://validator.w3.org/).

For the developer, the codebase should minimize the steps and amount of time
required to get up and running. From there, customization and extension of the
web app should be simple. The characteristics of a well-written codebase also
apply, such as:

- Easy to understand
- Modular functionality
- Clearly defined behavior with validation through tests

## Community and Resources

Join
[the `#saaskit` channel in Deno's Discord](https://discord.com/channels/684898665143206084/1085986084653109438)
to meet other CultKit developers, ask questions, and get unblocked.

Here's a list of articles, how to guides, and videos about CultKit:

- [Announcing Deno CultKit](https://deno.com/blog/announcing-deno-saaskit)
- [Getting Started with CultKit (video walkthrough)](https://www.youtube.com/watch?v=1GYs3NbVCfE)
