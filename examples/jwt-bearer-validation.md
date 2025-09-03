# JWT Bearer Token Validation

## Overview

When using the `urn:ietf:params:oauth:grant-type:jwt-bearer` grant type, OpenAuth validates the JWT signature and then calls your success callback where you can validate the issuer and map claims to your user system.

## Validation Process

1. **JWT signature verification**: OpenAuth fetches the issuer's JWKS and verifies the JWT signature
2. **Success callback**: Your success callback receives the JWT claims where you can validate the issuer
3. **Token generation**: If you approve the JWT, return `ctx.subject()` to generate final access/refresh tokens

## Configuration

```typescript
import { issuer } from "@openauthjs/openauth"
import { OidcProvider } from "@openauthjs/openauth/provider/oidc"

const app = issuer({
  providers: {
    gitlab: OidcProvider({
      clientID: "your-gitlab-app-id", 
      issuer: "https://gitlab.com"
    })
  },
  subjects: { /* your subjects */ },
  storage: /* your storage */,
  success: async (ctx, value) => {
    if (value.provider === "gitlab") {
      // Handle GitLab OAuth login
      const userID = /* map GitLab user to your system */
      return ctx.subject("user", { userID })
    }
    
    if (value.provider === "jwt-bearer") {
      console.log("JWT Bearer token from:", value.issuer)
      console.log("Full claims:", value.claims)
      
      // Validate the issuer - this is where YOU decide who to trust
      const trustedIssuers = [
        "https://gitlab.com",               // Your main GitLab instance
        "https://accounts.google.com",      // Google service accounts  
        "https://login.microsoftonline.com" // Azure AD
      ]
      
      if (!trustedIssuers.includes(value.issuer)) {
        throw new Error(`Untrusted issuer: ${value.issuer}`)
      }
      
      // Handle different issuers differently
      if (value.issuer === "https://gitlab.com") {
        // JWT from GitLab (maybe from CI/CD pipeline)
        const userID = /* lookup user from GitLab subject */
        return ctx.subject("user", { userID })
      }
      
      if (value.issuer === "https://accounts.google.com") {
        // JWT from Google service account
        const serviceID = /* extract service info */
        return ctx.subject("service", { serviceID })
      }
      
      // Add validation for additional custom claims
      if (value.claims.custom_role !== "api_access") {
        throw new Error("JWT missing required role")
      }
      
      return ctx.subject("api_user", { 
        userID: value.subject,
        issuer: value.issuer 
      })
    }
  }
})
```

## Token Exchange Flow

1. **Client sends JWT assertion**: A client makes a POST request to `/token` with:

   ```http
   grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<jwt_token>
   ```

2. **Signature verification**: OpenAuth fetches the issuer's JWKS from `${issuer}/.well-known/jwks.json` and verifies the JWT signature

3. **Success callback**: OpenAuth calls your success callback with:

   ```typescript
   {
     provider: "jwt-bearer",
     claims: JWTPayload, // Full JWT claims object
     issuer: string,     // The JWT issuer
     subject: string,    // The JWT subject (sub claim)  
     audience: string    // The JWT audience (aud claim)
   }
   ```

4. **Issuer validation**: In your success callback, you decide which issuers to trust

5. **Token generation**: If you approve the JWT, return `ctx.subject()` to generate final access/refresh tokens

## Security Considerations

**Why validate in the success callback?**

- **Flexible validation**: You can implement custom logic for different issuers
- **Context-aware**: Access to full JWT claims for additional validation
- **Granular control**: Different handling per issuer (users vs services vs APIs)
- **Dynamic trust**: Trust decisions can be based on database lookups or external APIs
- **Consistent pattern**: Same validation approach as other OAuth providers

**Best practices:**

- **Use allowlists**: Explicitly list trusted issuers rather than trying to block bad ones
- **Validate additional claims**: Check roles, audiences, or custom claims as needed
- **Log JWT usage**: Monitor bearer token usage for security auditing
- **Handle errors gracefully**: Throw clear errors for untrusted issuers or invalid claims
