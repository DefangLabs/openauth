import * as aiven from "@pulumi/aiven";
import * as pulumi from "@pulumi/pulumi";
import * as postgres from "@pulumi/postgresql";
import { interpolate } from "@pulumi/pulumi";
import { aivenProject } from "../common/aiven";
import { config } from "../common/config";
import { databaseProvider, databaseService } from "../database-service/database-service";
import { SERVICE_NAME } from "./constants";

export const hasuraDatabase = new aiven.PgDatabase(`${SERVICE_NAME}-database`, {
    databaseName: SERVICE_NAME,
    serviceName: databaseService.serviceName,
    project: aivenProject.project,
}, {dependsOn: [databaseService]});

export const hasuraUser = new aiven.PgUser(`${SERVICE_NAME}-user`, {
    username: SERVICE_NAME,
    serviceName: databaseService.serviceName,
    project: aivenProject.project,
    password: config.requireSecret("hasuraDatabasePassword"),
}, {dependsOn: [hasuraDatabase]});

// export const hasuraUser = new postgres.Role(`${SERVICE_NAME}-pg-user`, {
//     name: `${SERVICE_NAME}-user`,
//     password: config.requireSecret("hasuraDatabasePassword"),
// }, {dependsOn: [databaseService], provider: databaseProvider});

// export const hasuraDatabase = new postgres.Database(`${SERVICE_NAME}-pg-database`, {
//     name: `${SERVICE_NAME}-database`,
//     owner: hasuraUser.name,
// }, {dependsOn: [hasuraUser, databaseService], provider: databaseProvider})

// export const hasuraGrants = new postgres.Grant(`${SERVICE_NAME}-pg-grants`, {
//     database: hasuraDatabase.name,
//     privileges: ['ALL'],
//     role: hasuraUser.name,
//     objectType: 'schema',
//     schema: 'public',
// }, {dependsOn: [hasuraDatabase, hasuraUser], provider: databaseProvider});

export const hasuraDatabaseUri = interpolate`postgres://${
    databaseService.serviceUsername
}:${
    databaseService.servicePassword
}@${
    databaseService.serviceHost
}:${
    databaseService.servicePort
}/${
    hasuraDatabase.databaseName
}`;
