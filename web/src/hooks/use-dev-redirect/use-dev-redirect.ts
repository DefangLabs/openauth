import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useDevRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (
      window.location.hostname === "localhost" &&
      window.location.port === "3000"
    ) {
      router.push(`http://localhost:8000${window.location.pathname}`);
    }
  }, [router]);
}
