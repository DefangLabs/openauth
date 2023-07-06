import { COLORS } from "@/modules/mui/constants";
import { Stack, Typography, styled } from "@mui/material";
import { useServiceLogs } from "../../hooks/use-service-logs/use-service-logs";

const LogContainer = styled("pre")`
  background-color: #333;
  color: ${COLORS.secondary};
  overflow-x: scroll;
  width: 800px;
  max-width: calc(100vw - 400px);
  max-height: 50vh;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(2).toString()};
`;

export function Logs() {
  const logs = useServiceLogs();
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Logs</Typography>
      <LogContainer>{logs}</LogContainer>
    </Stack>
  );
}
