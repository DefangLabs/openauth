import { FC } from "react";
import { Inner } from "./components/inner/inner";

export function LoginRequired(Component: React.ComponentType<any>): FC<any> {
  const Wrapped = (props: any) => <Inner Component={Component} {...props} />;
  Wrapped.displayName = `LoginRequired(${Component.displayName})`;
  return Wrapped;
}
