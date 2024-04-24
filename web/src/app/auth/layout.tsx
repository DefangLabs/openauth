"use client";

import { GRADIENTS } from "@/modules/mui/constants";
import { Grid } from "@mui/material";
import { Suspense } from "react";
import { Main } from "./components/main/main";
import { SideBar } from "./components/sidebar/sidebar";
import { Loader } from "@/components/loader/loader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          backgroundImage: GRADIENTS.primary,
          flexDirection: {
            xs: "column-reverse",
            sm: "row",
          },
        }}
      >
        <Grid
          item
          sx={{
            minHeight: { xs: "100vh" },
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
          }}
          sm={6}
          xs={12}
        >
          <SideBar />
        </Grid>
        <Grid
          item
          sx={{
            minHeight: { xs: "100vh" },
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
          }}
          sm={6}
          xs={12}
        >
          <Main>
            <Loader>{children}</Loader>
          </Main>
        </Grid>
      </Grid>
    </>
  );
}
