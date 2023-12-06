# portal


## Secrets
- `aiven:apiToken`: created in Aiven dashboard; this expires when unused for 10 hours
- `defang-portal:aivenBillingGroup`:
- `defang-portal:dockerHubToken`: created in Docker Hub dashboard
- `defang-portal:githubClientSecret`: created in GitHub settings, OAuth Apps
- `defang-portal:hasuraAdminSecret`:
- `defang-portal:hasuraDatabasePassword`:
- `defang-portal:kratosDatabasePassword`:
- `defang-portal:kratosSecretsCipher0`: random 32 char string (24 bytes, base64 encoded)
- `defang-portal:kratosSecretsCookie0`: random 32 bytes, base64 encoded to 44 chars

## Deploy

```
pulumi -C pulumi up
```

Note that build might fail with "No space left on device" error. This is due to the default disk size of the Docker VM. To fix this, run `docker system prune` to remove all unused images and containers.
