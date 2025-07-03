alter table "public"."tenantMembers"
  add constraint "tenantMembers_userId_fkey"
  foreign key ("userId")
  references "public"."users"
  ("id") on update cascade on delete cascade;
