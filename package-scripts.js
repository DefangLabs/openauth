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
        default: npsUtils.concurrent.nps("dev.web", "dev.server"),
        server: {
            default: `${dockerComposeBase} up --build --force-recreate --remove-orphans`,
            down: `${dockerComposeBase} down`,
        },
        web: {
            default: "cd web && pnpm dev",
        }
    }
  },
};
