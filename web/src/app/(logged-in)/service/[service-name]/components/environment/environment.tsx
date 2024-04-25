import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";
import { thinGreyBorder } from "@/modules/mui/constants";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useService } from "../../hooks/use-service/use-service";
import { atom, useAtom, Provider } from "jotai";

const shownAtom = atom<Record<string, boolean>>({});

function Hideable({
  children,
  valKey,
}: {
  children: React.ReactNode;
  valKey: string;
}) {
  const [shownVals, setShownVals] = useAtom(shownAtom);
  const hidden = !shownVals[valKey];
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography>{hidden ? "***********" : children}</Typography>
      <IconButton
        onClick={() =>
          setShownVals((prev) => {
            const hide = !prev[valKey];
            analytics.track(EVENTS.toggleEnvVisibility, {
              visible: hide,
            });
            const next = { ...prev, [valKey]: hide };
            return next;
          })
        }
      >
        {hidden ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Stack>
  );
}

export function Environment() {
  const { service } = useService();

  const envs = service?.service?.environment || {};
  const secrets = service?.service?.secrets || [];
  const combined = [...Object.entries(envs), ...secrets];

  return Object.keys(combined || {}).length > 0 ? (
    <Stack spacing={2}>
      <Typography variant="h2">Environment</Typography>
      <TableContainer
        component={({ children }: { children: ReactNode }) => (
          <Paper elevation={0} sx={thinGreyBorder}>
            {children}
          </Paper>
        )}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={250}>Variable</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combined.map((config) => {
              let key = "";
              let value: string | undefined = undefined;

              if (Array.isArray(config)) {
                key = config[0];
                value = config[1];
              } else {
                key = config.source;
              }

              return (
                <TableRow key={key}>
                  <TableCell width={250}>{key}</TableCell>
                  <TableCell>
                    {value !== undefined ? (
                      <Hideable valKey={key}>{value}</Hideable>
                    ) : (
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Lock />
                        <Typography>Sensitive</Typography>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  ) : null;
}
