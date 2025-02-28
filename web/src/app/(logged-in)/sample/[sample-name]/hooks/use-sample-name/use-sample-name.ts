import { useParams } from "next/navigation";

export function useSampleName() {
  return useParams()["sample-name"] as string;
}
