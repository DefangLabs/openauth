alter table "public"."tenants" add column "provider" text
 not null default 'defang';
