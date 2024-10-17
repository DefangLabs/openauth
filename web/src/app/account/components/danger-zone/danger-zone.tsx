"use client";

import { DeleteAccountMutation } from "@/modules/accounts/graphql/mutations/delete-account-mutation";
import { useLogout } from "@/modules/kratos/hooks/use-logout/use-logout";
import { useMutation } from "@apollo/client";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useCallback, useState } from "react";

const VERIFY_TEXT = "Delete *all* my data and services";

export function DangerZone() {
  const [deleteAccount, { loading, data }] = useMutation(DeleteAccountMutation);
  const logout = useLogout();

  const [form, setForm] = useState({
    verifyText: "",
  });

  const isValid = form.verifyText === VERIFY_TEXT;

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isValid) {
        return;
      }
      window.confirm(
        "Last check. Are you sure you want to delete your account?"
      );
      try {
        const response = await deleteAccount();
        logout();
        window.location.href = "/";
      } catch (e) {
        console.error("@@ error deleting account", e);
      }
    },
    [deleteAccount, isValid, logout]
  );

  return (
    <form onSubmit={submit}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h2" color="red">
          Danger Zone
        </Typography>
        <Typography>
          Please type{" "}
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              backgroundColor: "#FDD",
              borderRadius: "4px",
              padding: "2px 4px",
              color: "red",
            }}
          >
            {VERIFY_TEXT}
          </span>{" "}
          and submit to delete your account. This action is irreversible.
        </Typography>
        <TextField
          value={form.verifyText}
          onChange={(e) =>
            setForm((p) => ({ ...p, verifyText: e.target.value }))
          }
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="contained"
            color="error"
            disabled={!isValid}
            type="submit"
          >
            Delete Account
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
