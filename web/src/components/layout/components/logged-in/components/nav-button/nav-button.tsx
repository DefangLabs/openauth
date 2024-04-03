import { Button, styled } from "@mui/material";
import Link from "next/link";
import { ComponentProps } from "react";
import { NAV_SURFACE } from "../../constants";
import { useSidebarOpen } from "../../hooks/use-sidebar-open/use-sidebar-open";

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
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export function NavButton({
  href,
  children,
  iconLeft,
  iconRight,
  ...props
}: NavButtonProps) {
  const { setSidebarOpen } = useSidebarOpen();
  return (
    <Link
      href={href}
      onClick={() => {
        setSidebarOpen(false);
      }}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      <InnerNavButton sx={{ justifyContent: "space-between" }} {...props}>
        {iconLeft || <div style={{ width: 15 }} />}
        <div style={{ marginBottom: -3 }}>{children}</div>
        {iconRight || <div style={{ width: 15 }} />}
      </InnerNavButton>
    </Link>
  );
}
