const npsUtils = require("nps-utils");

const dockerComposeDirs = [
    'kratos',
    'oathkeeper',
    'hasura',
    'fn',
];
const dockerComposeFileFlags = dockerComposeDirs.map(dir => `--file ./${dir}/docker-compose.yml`).join(' ');
const dockerComposeBase = `docker-compose -f ./docker-compose.yml ${dockerComposeFileFlags}`;

module.exports = {
  scripts: {
    default: {
      description: "Run the app",
      script: "nps dev",
    },
    dev: {
        default: npsUtils.concurrent.nps("dev.server"),
        server: {
            default: `${dockerComposeBase} up --build --force-recreate --remove-orphans`,
            down: `${dockerComposeBase} down`,
        },
        // Generally don't use this. We run the web client separately from this stuff.
        web: {
            default: "cd web && pnpm dev",
        },
        hasura: {
            default: "cd hasura && hasura console",
        },
        auth: {
          restart: "nps 'dc stop oathkeeper kratos' && nps 'dc up -d --force-recreate oathkeeper kratos'",
          logs: "nps 'dc logs -f --tail=400 oathkeeper kratos'",
        }
    },
    // docker-compose
    dc: {
      default: dockerComposeBase,
    }
  },
};
