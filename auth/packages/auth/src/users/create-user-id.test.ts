import { createLegacyId, createUserId } from "./create-user-id";

test("createLegacyId generates a consistent UUID for a given username", () => {
  const username = "raphaeltm";
  const uuid = createLegacyId(username);
  expect(uuid).toBe("40370936-4dac-5658-9c94-7e51372d6324");
});

test("createUserId generates a valid UUID", () => {
  const uuid = createUserId();
  expect(uuid).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  );
});
