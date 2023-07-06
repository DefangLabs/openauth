import { Box, Paper, Stack, Typography } from "@mui/material";
import { useService } from "../../hooks/use-service/use-service";
import { COLORS } from "@/modules/mui/constants";

export function MonthlyUsage() {
  const service = useService();
  return (
    <Paper style={{ border: `1px solid ${COLORS.darkGrey}` }}>
      <Box px={2} pt={1}>
        <Typography variant="h3">Monthly Usage</Typography>
      </Box>
      <Stack p={2} justifyContent="space-evenly" direction="row">
        <Stack>
          <Typography variant="h3">
            {/* {service?.monthlyUsage.vcpuHours} */}
          </Typography>
          <Typography>vCPU Hours</Typography>
        </Stack>
        <Stack>
          {/* <Typography variant="h3">{service?.monthlyUsage.tpuHours}</Typography> */}
          <Typography>TPU Hours</Typography>
        </Stack>
        <Stack>
          {/* <Typography variant="h3">{service?.monthlyUsage.gbHours}</Typography> */}
          <Typography>GB Hours</Typography>
        </Stack>
        <Stack>
          <Typography variant="h3">
            {/* {service?.monthlyUsage.avgLatency} */}
          </Typography>
          <Typography>Avg Latency</Typography>
        </Stack>
        <Stack>
          <Typography variant="h3">
            {/* ${((service?.monthlyUsage.usageMTD || 0) / 100).toFixed(2)} */}
          </Typography>
          <Typography>Month-to-date</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
