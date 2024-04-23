import { local } from '@pulumi/command';
import { interpolate } from "@pulumi/pulumi";
import { kratosDatabaseUri } from "./database";
import { image } from "./image";

export const migrationCommand = new local.Command("migration-command", {
    create: interpolate`docker run --rm -e DSN ${image.imageName} -c /etc/config/kratos/kratos.yml migrate sql -e --yes`,
    addPreviousOutputInEnv: false, // https://github.com/pulumi/pulumi-command/issues/285
    environment: {
        DSN: interpolate`${kratosDatabaseUri}?sslmode=require&max_conns=5&max_idle_conns=2`
    },
});
