import * as docker from "@pulumi/docker"
import { interpolate } from "@pulumi/pulumi"
import { kratosDatabase, kratosDatabaseUri, kratosUser } from "./database"
import { image } from "./image"

export const migrationJob = new docker.Container("migration-job", {
    image: image.imageName,
    command: ["-c", "/etc/config/kratos/kratos.yml", "migrate", "sql", "-e", "--yes"],
    restart: "no",
    envs: [
        interpolate`DSN=${kratosDatabaseUri}?sslmode=require&max_conns=5&max_idle_conns=2`
    ]
}, {dependsOn: [image, kratosDatabase, kratosUser]})