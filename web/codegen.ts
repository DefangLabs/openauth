import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  schema: [
    {
      "http://localhost:5002/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": "password",
          "x-hasura-role": "user",
        },
      },
    },
  ],
  generates: {
    "./src/generated/graphql/": {
      preset: "client",
      hooks: {
        afterOneFileWrite: ["prettier --write", "eslint --fix"],
      },
    },
    "./src/generated/graphql/schema.json": {
      plugins: ["introspection"],
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;
