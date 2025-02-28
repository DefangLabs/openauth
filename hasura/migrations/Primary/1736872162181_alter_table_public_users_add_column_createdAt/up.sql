alter table "public"."users" add column "createdAt" timestamptz
 null default now();
