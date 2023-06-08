"use client";

import { useParams } from "next/navigation";

export default function ServicePage() {
  const params = useParams();
  return <div>Service {params["service-id"]}</div>;
}
