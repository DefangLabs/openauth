# JWT Bearer Token Validation

## Overview

When using the `urn:ietf:params:oauth:grant-type:jwt-bearer` grant type, OpenAuth automatically validates JWT signatures using JWKS and calls your success callback to handle the validated JWT claims.

## Validation Process

1. **JWT decoding**: OpenAuth decodes the JWT assertion to extract claims
2. **OIDC provider matching**: Finds a matching OIDC provider based on the JWT issuer
3. **JWT signature verification**: Automatically fetches the issuer's JWKS and verifies the JWT signature using the provider's `verifyIdToken()` method
4. **Success callback**: Your success callback receives the validated JWT claims
5. **Token generation**: Return `ctx.subject()` to generate final access/refresh tokens

## Configuration

Configure `oidcProviders` for each JWT issuer you want to accept:

```typescript
import { issuer } from "@openauthjs/openauth"
import { OidcProvider } from "@openauthjs/openauth/provider/oidc"
import { GitHubProvider } from "@openauthjs/openauth/provider/github"

const app = issuer({
  // OIDC providers for JWT bearer validation
  oidcProviders: {
    gitlab: OidcProvider({
      clientID: "https://gitlab.com", // Must match JWT 'aud' claim
      issuer: "https://gitlab.com",   // Must match JWT 'iss' claim
      provider: "gitlab"              // Provider type identifier
    }),
    github: OidcProvider({
      clientID: "github-actions",
      issuer: "https://token.actions.githubusercontent.com",
      provider: "github"
    })
  },

  // Regular OAuth providers for interactive login
  providers: {
    github: GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  },

  subjects: { /* your subjects */ },
  storage: /* your storage */,

  success: async (ctx, value) => {
    // Handle regular OAuth providers
    if (value.provider === "github") {
      const providerData = await getGithubData(value.tokenset.access)
      const { user } = await upsertUser(providerData)
      return ctx.subject("user", {
        id: user.id,
        tenant: user.defaultTenant,
        hasura: {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": user.id,
        },
        externalTenants: user.tenants.map(t => t.id),
        githubOrgs: providerData.orgs?.map(org => org.name)
      }, {
        subject: user.id
      })
    }

    // Handle JWT bearer tokens
    if (!value.tokenset) {
      console.log("JWT Bearer token from:", value.issuer)
      console.log("JWT claims:", value.claims)

      // The JWT signature is already validated by OpenAuth using JWKS
      // Map different issuers to appropriate subjects

      if (value.issuer === "https://gitlab.com") {
        // JWT from GitLab CI/CD pipeline
        return ctx.subject("service", {
          id: value.subject,
          issuer: value.issuer,
        })
      }

      if (value.issuer === "https://token.actions.githubusercontent.com") {
        // JWT from GitHub CI Action
        return ctx.subject("service", {
          id: value.subject,
          issuer: value.issuer,
        })
      }

      // Default: map to API user if no specific handling
      return ctx.subject("api_user", {
        id: value.subject,
        issuer: value.issuer,
        audience: value.audience
      })
    }

    throw new Error(`Unsupported provider: ${value.provider}`)
  }
})
```

## Token Exchange Flow

1. **Client sends JWT assertion**: A client makes a POST request to `/token` with:

   ```http
   grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<jwt_token>
   ```

2. **OIDC provider matching**: OpenAuth finds the matching OIDC provider by comparing the JWT `iss` claim with configured provider issuers

3. **Signature verification**: OpenAuth uses the matched OIDC provider to verify the JWT signature (automatically fetches JWKS)

4. **Success callback**: OpenAuth calls your success callback with:

   ```typescript
   {
     provider: string,        // OIDC provider type (from config.type)
     claims: JWTPayload,      // Full JWT claims object
     issuer: string,          // The JWT issuer (iss claim)
     subject: string,         // The JWT subject (sub claim)
     audience: string         // The JWT audience (aud claim)
   }
   ```

5. **Token generation**: Return `ctx.subject()` to generate final access/refresh tokens

## Security Considerations

**OIDC provider configuration acts as allowlist:**

- **Explicit trust**: Only JWTs from configured `oidcProviders` are accepted
- **Automatic validation**: JWT signature verification is handled automatically
- **No additional issuer validation needed**: The OIDC provider matching already ensures trusted issuers
- **JWKS fetching**: OpenAuth automatically fetches and caches JWKS for signature verification

**Best practices:**

- **Configure specific issuers**: Only add OIDC providers for issuers you trust
- **Match audience claims**: Ensure JWT `aud` claim matches your `clientID` configuration
- **Validate additional claims**: Check roles, scopes, or custom claims in the success callback
- **Use specific types**: Create different subject types for different use cases (users vs services)
- **Log JWT usage**: Monitor bearer token usage for security auditing
- **Handle claim validation**: Throw clear errors for missing or invalid claims
