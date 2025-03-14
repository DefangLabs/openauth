"use client";

import { Loader } from "@/components/loader/loader";
import { loginAction } from "@/modules/auth/actions/actions";
import { GitHub } from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants";
import DefangIcon from "./assets/defang-icon.svg";

function LoginPage() {
  const pathname = usePathname();
  const isRegister = pathname === REGISTER_ROUTE;
  const verb = isRegister ? "Register" : "Login";

  return (
    <>
      <Box flexGrow={1} />
      <Image src={DefangIcon} height={100} width={100} alt="Defang logo" />
      <Typography variant="h2">
        {isRegister ? "Register for Defang" : "Login to Defang"}
      </Typography>
      <Button
        onClick={() => loginAction("github")}
        variant="contained"
        disableElevation
      >
        <GitHub height={20} width={20} sx={{ mr: 1 }} />
        {verb} with GitHub
      </Button>
      {isRegister ? (
        <Link component={NextLink} href={LOGIN_ROUTE}>
          Have an account? Login.
        </Link>
      ) : (
        <Link component={NextLink} href={REGISTER_ROUTE}>
          Don&apos;t have an account? Register.
        </Link>
      )}
      <Box flexGrow={1} />
      <Typography fontSize={14} width={300} align="center">
        By proceeding you are agreeing to our{" "}
        <a href="https://defang.io/terms-conditions.html" target="_blank">
          Terms and Conditions
        </a>
      </Typography>
    </>
  );
}

export default function Login() {
  return (
    <Loader>
      <LoginPage />
    </Loader>
  );
}
