CREATE TABLE "public"."userAccounts" ("userId" uuid NOT NULL, "accountId" uuid NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("userId","accountId") , FOREIGN KEY ("accountId") REFERENCES "public"."accounts"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_userAccounts_updatedAt"
BEFORE UPDATE ON "public"."userAccounts"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_userAccounts_updatedAt" ON "public"."userAccounts"
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
