"use client";

import DeleteWithConfirmationButton from "@/components/delete-with-confirmation-button";
import { initiateTenantDeletionMutation } from "@/modules/tenants/graphql/mutations/initiate-tenant-deletion-mutation";
import { useCurrentTenantId } from "@/modules/tenants/hooks/use-current-tenant-id";
import { useTenantsQuery } from "@/modules/tenants/hooks/use-tenants-query";
import { useMutation } from "@apollo/client";
import { Add, Business } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";

export function Tenants() {
  const { data, refetch } = useTenantsQuery();
  const [deleteTenant] = useMutation(initiateTenantDeletionMutation);
  const { currentTenantId, setCurrentTenantId } = useCurrentTenantId();
  const theme = useTheme();

  const handleDelete = async (id: string) => {
    await deleteTenant({ variables: { tenantId: id } });
    const refetchedTenants = await refetch();
    // if current tenant was deleted, set the first tenant as current
    if (currentTenantId === id && refetchedTenants?.data?.tenants?.length > 0) {
      setCurrentTenantId(refetchedTenants.data?.tenants?.[0].id);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Tenants
      </Typography>

      <Grid container spacing={3}>
        {/* Create New Tenant Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: `2px dashed ${theme.palette.primary.light}`,
              backgroundColor: "rgba(25, 118, 210, 0.04)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardActionArea
              component={Link}
              href="/tenants/new"
              sx={{
                flexGrow: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(25, 118, 210, 0.12)",
                  mb: 2,
                }}
              >
                <Add color="primary" fontSize="large" />
              </Box>
              <Typography variant="h6" align="center" color="primary">
                Create New Tenant
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1 }}
              >
                Set up a new team with its own billing and access control
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Existing Tenants */}
        {data?.tenants?.map((t) => (
          <Grid key={t.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.2s ease-in-out",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={`/projects`}
                // eventually we will have a tenant-specific URL
                // href={`/tenants/${t.id}`}
                onClick={() => {
                  setCurrentTenantId(t.id);
                }}
                sx={{
                  flexGrow: 1,
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover .MuiTypography-root": {
                    textDecoration: "none",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        mr: 2,
                      }}
                    >
                      <Business fontSize="small" />
                    </Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.2em",
                        maxHeight: "2.4em",
                        wordBreak: "break-word",
                      }}
                    >
                      {t.name}
                    </Typography>
                  </Box>
                  {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      minHeight: "3em",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Manage apps, users, and settings for this tenant
                  </Typography> */}
                </CardContent>
              </CardActionArea>

              <CardActions sx={{ justifyContent: "flex-end", py: 2, px: 2 }}>
                <DeleteWithConfirmationButton
                  dialogTitle="Delete tenant?"
                  dialogContent={`Are you sure you want to delete \"${t.name}\"? This action cannot be undone.`}
                  onDelete={() => handleDelete(t.id)}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
