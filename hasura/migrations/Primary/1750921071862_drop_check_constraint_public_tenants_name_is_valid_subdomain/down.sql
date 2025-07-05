alter table "public"."tenants" add constraint "name_is_valid_subdomain" check (CHECK (name ~ '^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$'::text));
