import { Circle } from "@mui/icons-material";
import { Tooltip, Icon } from "@mui/material";

const statusColorMap = {
  BUILD_QUEUED: "red",
  BUILD_PROVISIONING: "red",
  BUILD_PENDING: "red",
  BUILD_RUNNING: "red",
  BUILD_DEPROVISIONING: "red",
  BUILD_STOPPED: "red",
  DEPLOYMENT_QUEUED: "red",
  SERVICE_PROVISIONING: "red",
  SERVICE_PENDING: "red",
  SERVICE_ACTIVATING: "red",
  SERVICE_RUNNING: "orange",
  SERVICE_STEADY_STATE: "green",
  SERVICE_DEACTIVATING: "red",
  SERVICE_STOPPING: "red",
  SERVICE_DEPROVISIONING: "red",
  SERVICE_STOPPED: "red",
} as const;

export function StatusIcon({
  status,
}: {
  status?: string | keyof typeof statusColorMap;
}) {
  if (!status) return null;
  return (
    <Tooltip title={status}>
      <Icon
        sx={{
          color: statusColorMap[status as keyof typeof statusColorMap],
          mr: 1,
          position: "relative",
        }}
      >
        <Circle
          style={{ position: "absolute", left: 0, transform: "scale(0.6)" }}
        />
        <Circle style={{ position: "absolute", left: 0, opacity: "0.5" }} />
      </Icon>
    </Tooltip>
  );
}
