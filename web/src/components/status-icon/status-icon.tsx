import { Circle } from "@mui/icons-material";
import { Tooltip, Icon } from "@mui/material";
import { ServiceState } from "@/modules/defang/generated/fabric_pb";

const statusColorMap: Record<string, string> = {
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
  SERVICE_STEADY_STATE: "green", // FIXME: we can get this for rollbacks too
  TASK_DEACTIVATING: "orange",
  TASK_STOPPING: "orange",
  TASK_DEPROVISIONING: "orange",
  TASK_STOPPED: "orange", // StopCode=ServiceSchedulerInitiated
  SERVICE_DEPLOYMENT_IN_PROGRESS: "orange",
  SERVICE_DEPLOYMENT_COMPLETED: "green",
  SERVICE_DEPLOYMENT_FAILED: "red",
} as const;

function color(status: string) {
  return statusColorMap[status.split(" ", 1)[0]]; // strip off the status reason
}

export function StatusIcon({
  status,
  state,
}: {
  status?: string | keyof typeof statusColorMap;
  state?: ServiceState;
}) {
  if (!status) return null;
  return (
    <Tooltip title={status}>
      <Icon
        sx={{
          color:
            state === ServiceState.DEPLOYMENT_SCALED_IN
              ? "grey"
              : color(status),
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
