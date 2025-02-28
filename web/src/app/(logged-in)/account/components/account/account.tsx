"use client";

import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";
import { insertUserMutation } from "@/modules/profiles/graphql/mutations/insert-user-mutation";
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
import { DangerZone } from "../../components/danger-zone/danger-zone";
import { useAccountForm } from "../../hooks/use-account-form/use-account-form";

export function Account() {
  const {
    data: profileData,
    refetch,
    loading: profileLoading,
  } = useCurrentUserProfileQuery();
  const profile = profileData?.user;
  const { form, setForm } = useAccountForm();
  const [insertProfileMutation, { loading: mutationLoading }] =
    useMutation(insertUserMutation);

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
      analytics.track(EVENTS.updateProfile);
      const { errors } = await insertProfileMutation({
        variables: { object: form },
      });
      if (!errors) {
        refetch();
      } else {
        window.alert("Error saving profile: " + errors[0].message);
      }
    },
    [form, insertProfileMutation, refetch],
  );

  const loading = profileLoading || mutationLoading;

  return (
    <Stack
      spacing={2}
      sx={{ maxWidth: (theme) => theme.breakpoints.values.sm, p: 2, mb: 10 }}
    >
      <Typography variant="h1">Account</Typography>
      <form onSubmit={onSubmit}>
        <Stack spacing={2} mt={2}>
          <Typography variant="h2">Profile</Typography>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
          <TextField label="Email" value={profile?.email ?? ""} disabled />
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

      <DangerZone />
    </Stack>
  );
}
