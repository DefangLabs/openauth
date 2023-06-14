import * as aiven from "@pulumi/aiven";
import * as pulumi from "@pulumi/pulumi";
import * as postgres from "@pulumi/postgresql";
import { interpolate } from "@pulumi/pulumi";
import { aivenProject } from "../common/aiven";
import { config } from "../common/config";
import { databaseProvider, databaseService } from "../database-service/database-service";
import { SERVICE_NAME } from "./constants";

export const kratosDatabase = new aiven.PgDatabase(`${SERVICE_NAME}-database`, {
    databaseName: SERVICE_NAME,
    serviceName: databaseService.serviceName,
    project: aivenProject.project,
}, {dependsOn: [databaseService]});

export const kratosUser = new aiven.PgUser(`${SERVICE_NAME}-user`, {
    username: SERVICE_NAME,
    serviceName: databaseService.serviceName,
    project: aivenProject.project,
    password: config.requireSecret("kratosDatabasePassword"),
}, {dependsOn: [kratosDatabase]});

// export const kratosUser = new postgres.Role(`${SERVICE_NAME}-pg-user`, {
//     name: `${SERVICE_NAME}-user`,
//     password: config.requireSecret("kratosDatabasePassword"),
// }, {dependsOn: [databaseService], provider: databaseProvider});

// export const kratosDatabase = new postgres.Database(`${SERVICE_NAME}-pg-database`, {
//     name: `${SERVICE_NAME}-database`,
//     owner: kratosUser.name,
// }, {dependsOn: [kratosUser, databaseService], provider: databaseProvider})

// export const kratosGrants = new postgres.Grant(`${SERVICE_NAME}-pg-grants`, {
//     database: kratosDatabase.name,
//     privileges: ['ALL'],
//     role: kratosUser.name,
//     objectType: 'schema',
//     schema: 'public',
// }, {dependsOn: [kratosDatabase, kratosUser], provider: databaseProvider});

export const kratosDatabaseUri = interpolate`postgres://${
    databaseService.serviceUsername
}:${
    databaseService.servicePassword
}@${
    databaseService.serviceHost
}:${
    databaseService.servicePort
}/${
    kratosDatabase.databaseName
}`;
