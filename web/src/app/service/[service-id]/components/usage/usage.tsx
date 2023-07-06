import { Box, Paper, Stack, Typography } from "@mui/material";
import { useService } from "../../hooks/use-service/use-service";
import { COLORS } from "@/modules/mui/constants";

export function Usage() {
  const service = useService();
  return (
    <Paper style={{ border: `1px solid ${COLORS.darkGrey}` }}>
      <Box px={2} pt={1}>
        <Typography variant="h3">Usage</Typography>
      </Box>
      <Stack p={2} justifyContent="space-evenly" direction="row">
        <Stack>
          {/* <Typography variant="h3">{service?.vcpus}</Typography> */}
          <Typography>CPU</Typography>
        </Stack>
        <Stack>
          {/* <Typography variant="h3">{service?.tpu}</Typography> */}
          <Typography>TPU</Typography>
        </Stack>
        <Stack>
          {/* <Typography variant="h3">{service?.memory}</Typography> */}
          <Typography>GB</Typography>
        </Stack>
        <Stack>
          {/* <Typography variant="h3">{service?.latencyMs}</Typography> */}
          <Typography>Latency</Typography>
        </Stack>
        <Stack>
          <Typography variant="h3">
            {/* ${((service?.hourlyUsageCents || 0) / 100).toFixed(2)} */}
          </Typography>
          <Typography>Usage</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
