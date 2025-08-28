/**
 * Generate a canonical tenant ID for external providers.
 *
 * Tenants managed outside of Defang (ex: GitHub organizations) are
 * represented internally using UUID v5. The provider name is used as
 * the namespace and the provider specific ID is used as the value. This
 * ensures the same organization always maps to the same ID every time a
 * user logs in, without storing additional state client side. Using the
 * provider name as the namespace guarantees that IDs from different
 * providers never collide.
 */
import { v5 as uuidv5 } from 'uuid';
import { EnabledProviders } from '../providers/providers';

/**
 * Returns the UUID v5 based on the provider and external identifier.
 */
export function createExternalTenantId(
  provider: EnabledProviders,
  externalId: string,
) {
  const providerSpace = uuidv5(provider, uuidv5.DNS);
  return uuidv5(externalId, providerSpace);
}
