import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { COLORS } from "@/modules/mui/constants";
import { Paper, Stack, Typography, styled } from "@mui/material";

const Small = styled(Typography)`
  font-weight: 400;
`;
Small.defaultProps = {
  component: "span",
} as any;

const ServicePaper = styled(Paper)`
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid ${COLORS.colorBorder};
`;

export function ServiceStats() {
  const services = useServices();
  const count = services.length;
  const vcpus = services.reduce((acc, service) => acc + service.vcpus, 0);
  const memoryInGb = services.reduce(
    (acc, service) => acc + service.memory / 1024,
    0
  );
  return (
    <ServicePaper>
      <Stack direction="row" justifyContent="space-evenly" p={2}>
        <Typography variant="h3" color="white">
          {count}
          <Small>svc</Small>
        </Typography>
        <Typography variant="h3" color="white">
          {vcpus}
          <Small>vCPU</Small>
        </Typography>
        <Typography variant="h3" color="white">
          {memoryInGb.toFixed(0)}
          <Small>GB</Small>
        </Typography>
      </Stack>
    </ServicePaper>
  );
}
