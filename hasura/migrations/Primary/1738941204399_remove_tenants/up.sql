DROP TRIGGER IF EXISTS users_tenant_trigger ON users;

DROP FUNCTION IF EXISTS set_tenant_if_empty();

DROP FUNCTION IF EXISTS generate_unique_tenant(TEXT, TEXT, TEXT);

ALTER TABLE users DROP COLUMN IF EXISTS tenant;
