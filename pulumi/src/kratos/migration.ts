import { local } from '@pulumi/command';
import { interpolate } from "@pulumi/pulumi";
import { kratosDatabaseUri } from "./database";
import { image } from "./image";


export const migrationCommand = new local.Command("migration-command", {
    create: interpolate`docker run --rm -e DSN="${
        kratosDatabaseUri
    }?sslmode=require&max_conns=5&max_idle_conns=2" ${
        image.imageName
    } -c /etc/config/kratos/kratos.yml migrate sql -e --yes`
});
