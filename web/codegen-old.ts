import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  documents: "src/**/*.graphql",
  schema: "http://localhost:5000/.hasura/v1/graphql",
  generates: {
    "./src/generated/graphql/": {
      preset: "client",
    },
    // "src/generated/graphql/schema.json": {
    //   plugins: ["introspection"],
    //   hooks: {
    //     afterOneFileWrite: ["prettier --write"],
    //   },
    // },
    // "src/generated/graphql/index.tsx": {
    //   plugins: [
    //     {
    //       add: {
    //         content: "// THIS FILE IS GENERATED, DO NOT EDIT!",
    //       },
    //     },
    //     "typescript",
    //   ],
    // },
  },
};

export default config;
