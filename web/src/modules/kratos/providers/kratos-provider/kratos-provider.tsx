import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUpdateSession } from "../../hooks/use-update-session/use-update-session";
import { useCreateProfile } from "../../hooks/use-create-profile/use-create-profile";

interface KratosProviderProps {
  children: React.ReactNode;
}

const REDIRECT_KEY = "DFNG_REDIRECT";

export function KratosProvider({ children }: KratosProviderProps) {
  const updateSession = useUpdateSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    updateSession({
      onSuccess: () => {
        const redirect = window.localStorage.getItem(REDIRECT_KEY);
        if (redirect) {
          window.localStorage.removeItem(REDIRECT_KEY);
          window.location.href = redirect;
        }
      },
      onError: () => {
        if (!pathname.includes("/auth")) {
          window.localStorage.setItem(REDIRECT_KEY, window.location.href);
          router.push("/auth/login");
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useCreateProfile();

  return <>{children}</>;
}
