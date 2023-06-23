import { COLORS } from "@/modules/mui/constants";
import { Button, styled } from "@mui/material";
import Link from "next/link";
import { ComponentProps } from "react";
import { NAV_SURFACE } from "../../constants";

const InnerNavButton = styled(Button)`
  ${NAV_SURFACE}
  color: white;
  font-family: var(--headers-font), "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  & * {
    color: white;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
InnerNavButton.defaultProps = {
  fullWidth: true,
  variant: "contained",
};

type NavButtonProps = ComponentProps<typeof InnerNavButton> & {
  href: string;
};

export function NavButton({ href, ...props }: NavButtonProps) {
  return (
    <Link href={href}>
      <InnerNavButton {...props}></InnerNavButton>
    </Link>
  );
}
