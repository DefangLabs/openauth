CREATE TABLE "public"."tenantMembers" ("tenantId" uuid NOT NULL, "userId" uuid NOT NULL, "role" text, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("tenantId","userId") , FOREIGN KEY ("role") REFERENCES "public"."tenantRoles"("name") ON UPDATE cascade ON DELETE set null);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updatedAt"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updatedAt" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_tenantMembers_updatedAt"
BEFORE UPDATE ON "public"."tenantMembers"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_tenantMembers_updatedAt" ON "public"."tenantMembers"
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
