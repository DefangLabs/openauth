alter table "public"."users" add constraint "profiles_defangId_key" unique (defangId);
alter table "public"."users" alter column "defangId" drop not null;
alter table "public"."users" add column "defangId" text;
