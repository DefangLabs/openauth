# Defang Auth

Based on OpenAUTH.

## Dev

### Prerequisites

You'll need to create a github OAuth app and set the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables in a `.env` file in the root of the project.

### Running

Run `docker compose -f ./compose.dev.yaml up` to get started. This will boot up a `amazon/dynamodb-local` container and create the necessary tables. I haven't got around to creating a script to wait for it to be ready though, so you might need to restart the auth server if it says it wasn't able to connect to Dynamo because it started too fast (hot reloading is enabled so you can just hit save in one of the files).




