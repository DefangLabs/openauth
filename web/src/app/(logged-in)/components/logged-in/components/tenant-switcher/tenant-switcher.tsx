"use client";

/**
 * TenantSwitcher displays the name of the currently selected tenant and allows
 * the user to change it.
 *
 * The dropdown menu lists all tenants returned from `useTenantsQuery`. When an
 * item is selected the shared `currentTenant` atom is updated so other parts of
 * the application react to the change.  A small settings icon sits next to the
 * tenant name and links to the account page.
 */
import { useCurrentTenantId } from "@/modules/tenants/hooks/use-current-tenant-id";
import { useFeatureFlag } from "@/modules/feature-flags/hooks/use-feature-flag";
import { useTenantsQuery } from "@/modules/tenants/hooks/use-tenants-query";
import { Business, ManageAccounts, ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_SURFACE } from "../../constants";
import { useSidebarOpen } from "../../hooks/use-sidebar-open/use-sidebar-open";
import { useRouter } from "next/navigation";

const TenantChip = styled(Chip)`
  ${NAV_SURFACE}
  height: 40px;
  border-radius: 20px;
  flex-grow: 1;
  color: white;

  & .MuiChip-label {
    color: white;
    font-weight: 700;
  }
`;

const TenantLabel = styled(Typography)`
  min-width: 80px;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
` as typeof Typography;

export function TenantSwitcher() {
  const showSwitcher = useFeatureFlag("TENANT_SWITCHER");
  const { data } = useTenantsQuery();
  const { currentTenantId, setCurrentTenantId } = useCurrentTenantId();
  const { setSidebarOpen } = useSidebarOpen();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const tenants = data?.tenants || [];
  const selected = tenants.find((t) => t.id === currentTenantId) || tenants[0];

  useEffect(() => {
    if (!currentTenantId && selected) {
      setCurrentTenantId(selected.id);
    }
  }, [currentTenantId, selected, setCurrentTenantId]);

  return (
    <>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <TenantChip
            avatar={
              // white circle with business icon
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  p: 0.5,
                  flexShrink: 0,
                }}
              >
                <Business sx={{ color: "#093e9f" }} fontSize="small" />
              </Box>
            }
            label={
              <TenantLabel component="div" variant="h5" color="white">
                {selected ? selected.name : "no tenant"}{" "}
                {showSwitcher ? (
                  <ArrowDropDown
                    sx={{
                      color: "white",
                      fontSize: "1.2rem",
                      mb: "-0.1rem",
                      transition: "transform 0.2s ease-in-out",
                      transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                ) : null}
              </TenantLabel>
            }
            onClick={
              showSwitcher ? (e) => setAnchorEl(e.currentTarget) : undefined
            }
            sx={{
              "& .MuiChip-label": {
                flexGrow: 1,
              },
            }}
          />
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {tenants.map((t) => (
          <MenuItem
            key={t.id}
            selected={t.id === selected?.id}
            onClick={() => {
              setCurrentTenantId(t.id);
              setAnchorEl(null);
              setSidebarOpen(false);
              router.push(`/projects`);
            }}
          >
            {t.name}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          component={Link}
          href="/tenants"
          onClick={() => setSidebarOpen(false)}
          sx={{ fontWeight: 700, fontSize: "0.8rem" }}
        >
          <ListItemIcon>
            <ManageAccounts fontSize="small" />
          </ListItemIcon>
          Manage Tenants
        </MenuItem>
      </Menu>
    </>
  );
}
