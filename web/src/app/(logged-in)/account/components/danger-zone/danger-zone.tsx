"use client";

import { DeleteUserMutation } from "@/modules/accounts/graphql/mutations/delete-user-mutation";
import { logoutAction } from "@/modules/auth/actions/actions";
import { useMutation } from "@apollo/client";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { FormEvent, useCallback, useState } from "react";

const VERIFY_TEXT = "Delete *all* my data and playground services";

export function DangerZone() {
  const [deleteUser, { loading, data }] = useMutation(DeleteUserMutation);

  const [form, setForm] = useState({
    verifyText: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const isValid = form.verifyText === VERIFY_TEXT;

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isValid) {
        return;
      }
      if (
        !window.confirm(
          "Last check. Are you sure you want to delete your account?",
        )
      ) {
        return;
      }
      try {
        const response = await deleteUser();
        logoutAction();
        window.location.href = "/";
      } catch (e: any) {
        setError(e?.message || "Failed to delete account");
        setOpen(true);
        console.error("@@ error deleting account", e);
      }
    },
    [deleteUser, isValid],
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
          and submit to delete your account and any Playground services. This
          action is irreversible.
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
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error" onClose={() => setOpen(false)}>
            {error}
          </Alert>
        </Snackbar>
      </Stack>
    </form>
  );
}
