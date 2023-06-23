import { FC } from "react";
import { Inner } from "./components/inner/inner";

export function LoginRequired<T extends React.Component>(
  Component: React.ComponentType<T>
): FC<T> {
  const Wrapped = (props: T) => <Inner Component={Component} {...props} />;
  Wrapped.displayName = `LoginRequired(${Component.displayName})`;
  return Wrapped;
}
