// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  schema: [
    {
      [process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT]: {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
        },
      },
    },
    "src/apollo/client-schema.graphql",
  ],
  documents: ["src/{components,pages}/**/*.{ts,tsx}"],
  overwrite: true,
  generates: {
    "src/apollo/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        preResolveTypes: false,
      },
    },
  },
};
