
## Using Docker to Deploy to any VPS

[Docker](https://docker.com) makes it easy to deploy and run your Deno app to
any virtual private server (VPS). This section will show you how to do that with
AWS Lightsail and Digital Ocean.

### Setting up Docker

[Install Docker](https://docker.com) on your machine, which should also install
[the `docker` CLI](https://docs.docker.com/engine/reference/commandline/cli/).

Create an account on [Docker Hub](https://hub.docker.com), a registry for Docker
container images.

Create a `Dockerfile` in the root of your repo:

```docker
FROM denoland/deno:1.32.4

EXPOSE 8000

WORKDIR /app

ADD . /app

# Add dependencies to the container's Deno cache
RUN deno cache main.ts --import-map=import_map.json
CMD ["run", "--allow-run", "--allow-write", "--allow-read", "--allow-env", "--allow-net", "main.ts"]
```

Create a `.dockerignore` file in the root folder of your repo to make sure
certain files are not deployed to the docker container:

```
README.md
.example.env
.vscode/
.github/
```

A `docker-compose.yml` file will be needed to run the docker file on a VPS.
Here’s what that file in your repo's root folder will look like:

```yml
version: '3'

services:
  web:
    build: .
    container_name: deno-sasskit
    image: deno-image
   environment:
     - DENO_DEPLOYMENT_ID=${DENO_DEPLOYMENT_ID}
     - GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
     - GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
    ports:
      - "8000:8000"
```
<!-- todo add there about alchemy-->

The values of the environmental variables are pulled from the `.env` file.

The `DENO_DEPLOYMENT_ID` variable is needed for Docker deployment of a Deno
Fresh app for caching to work properly. Its value needs to be a unique id tied
to the deployment. We recommend using the SHA1 commit hash, which can be
obtained from the following command run in the repo's root folder:

```sh
# get the SHA1 commit hash of the current branch
git rev-parse HEAD
```

### Automatic Deployment with Deno Deploy

These steps show you how to deploy your SaaS app close to your users at the edge
with [Deno Deploy](https://deno.com/deploy).

1. Clone this repository for your SaaSKit project.

2. Sign into [Deno Deploy](https://dash.deno.com) with your GitHub account.

3. Select your GitHub organization or user, repository, and branch

4. Select "Automatic" deployment mode and `main.ts` as the entry point

5. Click "Link", which will start the deployment.

6. Once the deployment is complete, click on "Settings" and add the production
   environmental variables, then hit "Save"

You should be able to visit your newly deployed SaaS.

### Deno Deploy via GitHub Action

You can also choose to deploy to
[Deno Deploy via a GitHub Action](https://github.com/denoland/deployctl/blob/main/action/README.md),
which offers more flexibility. For instance, with the GitHub Action, you could:

- Add a build step
- Run `deno lint` to lint your code
- Run `deno test` to run automated unit tests

1. Create
   [a new, empty project from the Deno Deploy dashboard](https://dash.deno.com/new).
   Set a name for your project.

2. Add the GitHub Action.

[GitHub Actions](https://docs.github.com/en/actions) are configured using a
`.yml` file placed in the `.github/workflows` folder of your repo. Here's an
example `.yml` file to deploy to Deno Deploy. Be sure to update the
`YOUR_DENO_DEPLOY_PROJECT_NAME` with one that you've set in Deno Deploy.

```yml
# Github action to deploy this project to Deno Deploy
name: Deploy
on: [push]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    permissions:
      id-token: write  # Needed for auth with Deno Deploy
      contents: read  # Needed to clone the repository

    steps:
      - name: Clone repository
        uses: actions/checkout@v3

      - name: Install Deno
        uses: denoland/setup-deno@main
        # If you need to install a specific Deno version
        # with:
        #   deno-version: 1.32.4

## You would put your building, linting, testing and other CI/CD steps here

## Finally, deploy
      - name: Upload to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: YOUR_DENO_DEPLOY_PROJECT_NAME
          entrypoint: main.ts
          # root: dist
          import-map: import_map.json
          exclude: .git/** .gitignore .vscode/** .github/** README.md .env .example.env
```

3. Commit and push your code to GitHub. This should trigger the GitHub Action.
   When the action successfully completes, your app should be available on Deno
   Deploy.

### Deploying to Amazon Lightsail with Docker

In order to deploy your Docker image to Amazon Lightsail you need to create an
AWS account if you don’t already have one.

1. The deployment process starts with a local Docker image build which requires
   that the `Dockerfile` and `docker-compose.yml` have beed created
   [as above](#setting-up-docker):

```sh
docker compose -f docker-compose.yml build
```

2. Tag your image locally using the following command:

```sh
docker tag deno-image {{ username }}/deno-saaskit-aws
```

The name `deno-image` comes from your `docker-compose.yml` file.

3. The tagged image needs to be registered on
   [Docker Hub](https://hub.docker.com). In order to do that, sign into your Hub
   account (or create one if you don’t have one).

4. Push the tagged image to Docker Hub. We have chosen the name
   `deno-saaskit-aws` which you can change. Substitute `{{username}}` with your
   Docker Hub username.

```sh
docker push {{ username }}/deno-saaskit-aws
```

You should then be able to see your image on Docker Hub where it can be picked
up by the AWS container service.

5. Go to the
   [AWS LIghtsail Create a Container Service landing page](https://lightsail.aws.amazon.com/ls/webapp/create/container-service).
   On that page you can choose a server location and service capacity or keep
   the defaults.

- Click on “Setup deployment” and choose “Specify a custom deployment” which
  will result in the display of a form. Here’s what you need to fill out:

  - _Container name_: Give it a name of your choosing.
  - _Image_: Use the Docker Hub name {{username}}/deno-saaskit-aws.
  - _Open Ports_: Click “Add open ports” and then enter “8000” as the port.
  - _Environmental Variables_: Enter the name and values of all production
    environmental variables from `.env`.
  - _Public Endpoint_: Select the container name you just entered.

Under “Identify your service”, enter a container service name of your choosing.
It will become part of the app's domain.

6. Click the “Create Container Service” button. It will take some time for the
   deployment to complete. You will see a "Deployed” message when it is
   finished.

After the deployment is complete, click on the public address link and you'll
see your app running in the browser.

### Deploying to Digital Ocean with Docker

To deploy your image to Digital Ocean, you will need A
[Digital Ocean account](https://www.digitalocean.com/) and the
[`doctl` CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/)
installed and validated locally.

1. Build the Docker image locally and tag it for a Digital Ocean Container
   Registry. This requires that you have created `Dockerfile` and
   `docker-compose.yml` files [as instructed above](#setting-up-docker)

```sh
# Local Docker build
docker compose -f docker-compose.yml build
```

```sh
# Tag for DO container registry (separate from Docker Hub)
docker tag deno-image registry.digitalocean.com/deno-saaskit/deno-image:new
```

2. Push your tagged image to your DO container registry.

- [Create an API token with `doctl`](https://docs.digitalocean.com/reference/doctl/how-to/install/#step-2-create-an-api-token)
  and
  [validate that you can authenticate with the CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/#step-4-validate-that-doctl-is-working).

- Login using `doctl` and the API token you just created:

```sh
doctl registry login -t {{ API Access Token }}
```

- Create a Digital Ocean Container Registry named `deno-saaskit`:

```sh
doctl registry create deno-saaskit
```

Alternatively, you can
[create the container registry online](https://docs.digitalocean.com/products/container-registry/quickstart/).

- Push the image to Digital Ocean’s registry (make sure you are logged in using
  `doctl registry login`).

```sh
docker push registry.digitalocean.com/deno-saaskit/deno-image:new
```

You should now be able to see your image in the
[DO Container Registry](https://cloud.digitalocean.com/registry).

3. Once the `deno-image` has been pushed to the Digital Ocean registry we can
   run it in a
   [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets). Go
   to your
   [Digital Ocean project page](https://cloud.digitalocean.com/projects/) and
   click the 'Create' button and select 'Droplets'.

4. When the droplet is created, use the `console` link on your droplet page to
   SSH to the droplet VM or
   [use SSH locally](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/)
   run this command:

```sh
docker run -d --restart always -it -p 8000:8000 --name deno-image registry.digitalocean.com/deno-on-digital-ocean/deno-image:new
```

The URL will be visible once the command completes. Use the droplet's IP address
with port 8000 to browse to your application deployed on Digital Ocean.
