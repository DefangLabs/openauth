"use client";

import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { InsertProfileMutation } from "@/modules/profiles/graphql/mutations/insert-profile-mutation";
import { useCurrentUserProfileQuery } from "@/modules/profiles/hooks/use-current-user-profile-query/use-current-user-profile-query";
import { useMutation } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useCallback, useEffect } from "react";
import { useAccountForm } from "./hooks/use-account-form/use-account-form";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";

export default LoginRequired(function AccountPage() {
  const {
    data: profileData,
    refetch,
    loading: profileLoading,
  } = useCurrentUserProfileQuery();
  const profile = profileData?.profilesByPk;
  const email = useSession().session?.identity.traits.email || "";
  const { form, setForm } = useAccountForm();
  const [insertProfileMutation, { loading: mutationLoading }] = useMutation(
    InsertProfileMutation
  );

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile?.name || "",
      });
    }
  }, [profile, setForm]);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { errors } = await insertProfileMutation({
        variables: { object: form },
      });
      if (!errors) {
        refetch();
      } else {
        window.alert("Error saving profile: " + errors[0].message);
      }
    },
    [form, insertProfileMutation, refetch]
  );

  const loading = profileLoading || mutationLoading;

  return (
    <Stack spacing={1} p={2}>
      <Typography variant="h1">Account</Typography>
      <Typography>
        Welcome to the Defang Opinionated Platform, <b>{profile?.name}</b>.
      </Typography>
      <form onSubmit={onSubmit}>
        <Stack spacing={2} mt={2} maxWidth={400}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
          <TextField label="Email (from GitHub)" value={email} disabled />
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="flex-end"
          >
            <Button onClick={() => setForm({ name: profile?.name || "" })}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading && <CircularProgress size={24} />}
              Save
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}) as any;
