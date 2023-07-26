import * as aiven from "@pulumi/aiven";
import * as pulumi from "@pulumi/pulumi";
import { aivenProject } from "../common/aiven";
import * as postgres from "@pulumi/postgresql";

export const databaseService = new aiven.Pg("database-server", {
    project: aivenProject.project,
    serviceName: `defangportal-${pulumi.getStack()}-db`,
    plan: 'hobbyist',
    cloudName: 'google-us-west1', // TODO: move to aws-us-west2
}, {dependsOn: [aivenProject]});

export const databaseProvider = new postgres.Provider(`postgres-provider`, {
    username: databaseService.serviceUsername,
    password: databaseService.servicePassword,
    host: databaseService.serviceHost,
    port: databaseService.servicePort,
    database: 'defaultdb',
    sslmode: 'require',
}, {dependsOn: [databaseService]});