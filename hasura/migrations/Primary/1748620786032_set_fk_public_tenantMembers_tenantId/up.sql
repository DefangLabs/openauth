alter table "public"."tenantMembers"
  add constraint "tenantMembers_tenantId_fkey"
  foreign key ("tenantId")
  references "public"."tenants"
  ("id") on update cascade on delete cascade;
