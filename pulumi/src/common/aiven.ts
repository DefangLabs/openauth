import * as aiven from "@pulumi/aiven";
import * as pulumi from "@pulumi/pulumi";
import { config } from "./config";


export const aivenProject = new aiven.Project("portal-project", {
    project: `defangportal-${pulumi.getStack()}`,
    billingGroup: config.requireSecret("aivenBillingGroup"),
});