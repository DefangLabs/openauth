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
  // from https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-lifecycle.html
  TASK_PROVISIONING: "red",
  TASK_PENDING: "red",
  TASK_ACTIVATING: "red",
  TASK_RUNNING: "orange",
  SERVICE_STEADY_STATE: "green",
  TASK_DEACTIVATING: "orange",
  TASK_STOPPING: "orange",
  TASK_DEPROVISIONING: "orange",
  TASK_STOPPED: "orange", // StopCode=ServiceSchedulerInitiated
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
