import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { config, dockerHubToken } from '../common/config';
import {ROOT_URL } from '../common/constants';
import { SERVICE_NAME } from './constants';
import { kratosDatabase, kratosDatabaseUri, kratosUser } from './database';
import { image } from './image';
import { migrationCommand } from './migration';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.imageName}`;

export const service = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{ target: 4433, protocol: 'http', mode: 'host' }],
    platform: 'linux/arm64',
    environment: {
        DSN: pulumi.interpolate`${kratosDatabaseUri}?sslmode=require&max_conns=5&max_idle_conns=2`,
        SERVE_PUBLIC_BASE_URL: `${ROOT_URL}/svc/kratos`,
        SERVE_PUBLIC_CORS_ALLOWED_ORIGINS_0: `${ROOT_URL}`,
        SELFSERVICE_DEFAULT_BROWSER_RETURN_URL: `${ROOT_URL}`,
        SELFSERVICE_ALLOWED_RETURN_URLS_0: `${ROOT_URL}/auth`,
        SELFSERVICE_ALLOWED_RETURN_URLS_1: `${ROOT_URL}`,
        SELFSERVICE_FLOWS_ERROR_UI_URL: `${ROOT_URL}/auth/error`,
        SELFSERVICE_FLOWS_SETTINGS_UI_URL: `${ROOT_URL}/auth/settings`,
        SELFSERVICE_FLOWS_RECOVERY_UI_URL: `${ROOT_URL}/auth/recovery`,
        SELFSERVICE_FLOWS_VERIFICATION_UI_URL: `${ROOT_URL}/auth/verification`,
        SELFSERVICE_FLOWS_VERIFICATION_AFTER_DEFAULT_BROWSER_RETURN_URL: `${ROOT_URL}/auth/login`,
        SELFSERVICE_FLOWS_LOGOUT_AFTER_DEFAULT_BROWSER_RETURN_URL: `${ROOT_URL}/auth/login`,
        SELFSERVICE_FLOWS_LOGIN_UI_URL: `${ROOT_URL}/auth/login`,
        SELFSERVICE_FLOWS_REGISTRATION_UI_URL: `${ROOT_URL}/auth/login`,
        LOG_LEAK_SENSITIVE_VALUES: 'false',
        SECRETS_COOKIE_0: config.requireSecret('kratosSecretsCookie0'),
        SECRETS_CIPHER_0: config.requireSecret('kratosSecretsCipher0'),
        SELFSERVICE_METHODS_OIDC_CONFIG_PROVIDERS_0_CLIENT_ID: config.require('githubClientId'),
        SELFSERVICE_METHODS_OIDC_CONFIG_PROVIDERS_0_CLIENT_SECRET: config.require('githubClientSecret'),
    },
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:4433/health/alive'],
    },
}, { dependsOn: [image, migrationCommand, kratosDatabase, kratosUser] });