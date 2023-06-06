export function LoggedOut({ children }: { children: React.ReactNode }) {
  console.log("LoggedOut");
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
