import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUpdateSession } from "../../hooks/use-update-session/use-update-session";
import { useCreateProfile } from "../../hooks/use-create-profile/use-create-profile";

interface KratosProviderProps {
  children: React.ReactNode;
}

export function KratosProvider({ children }: KratosProviderProps) {
  const updateSession = useUpdateSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    updateSession({
      onError: () => {
        if (!pathname.includes("/auth")) {
          router.push("/auth/register");
        }
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useCreateProfile();

  return <>{children}</>;
}
