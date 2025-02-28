alter table "public"."accounts" add column "createdAt" timestamptz
 null default now();
