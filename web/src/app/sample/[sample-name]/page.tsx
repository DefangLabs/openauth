"use client";

import { Loader } from "@/components/loader/loader";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";

import { fetchSamples } from "@/modules/samples/lib/fetch-samples/fetch-samples";
import { getTagColor } from "@/modules/samples/lib/get-tag-color/get-tag-color";
import {
  Box,
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";

// export default function SamplePage() {
// return (
//   <div className="modal-box w-full sm:w-8/12 md:w-6/12 max-w-full">
//     <h3 className="font-bold text-lg">{selectedSample?.title}</h3>
//     <p>{selectedSample.shortDescription}</p>
//     <p className="font-bold mt-4">Create a new project from this sample:</p>
//     <div
//       onClick={() => {
//         navigator.clipboard.writeText(getStartedCmd);
//         // select the text in the pre tag with id "sample-command" so the user can copy it manually if they want
//         const selection = window.getSelection();
//         const range = document.createRange();
//         range.selectNodeContents(document.getElementById("sample-command")!);
//         selection?.removeAllRanges();
//         selection?.addRange(range);

//         setCopied?.(true);
//         setTimeout(() => setCopied?.(false), 1000);

//         analytics.track(
//           "Portal: Sample Generate Command Clicked",
//           selectedSample
//         );
//       }}
//       onMouseDown={() => setClicked(true)}
//       onMouseUp={() => setClicked(false)}
//     >
//       <div className="absolute right-4 flex h-full items-center">
//         <ContentCopy />
//       </div>
//       <pre className="p-4" id="sample-command">
//         {getStartedCmd}
//       </pre>
//       <Box
//         sx={{
//           opacity: clicked ? 0.5 : 0,
//         }}
//       >
//         <p className="text-white text-center p-2">copied!</p>
//       </Box>
//     </div>
//     <div className="mt-4">
//       <p>
//         You can automatically deploy to Defang by cloning a sample repo using
//         the 1 click deploy button below, or you can check out the source code
//         on GitHub.
//       </p>
//     </div>
//     <div className="modal-action">
//       <a
//         href={`https://portal.defang.dev/redirect?url=${encodeURIComponent(
//           `https://github.com/new?template_name=sample-${selectedSample.name}-template&template_owner=DefangSamples`
//         )}`}
//         className="btn btn-secondary"
//         target="_blank"
//         onClick={() => {
//           analytics.track("Website: 1-click Deploy Clicked", selectedSample);
//         }}
//       >
//         1-Click Deploy
//       </a>
//       <a
//         href={`https://github.com/DefangLabs/samples/tree/main/samples/${selectedSample.name}`}
//         className="btn btn-secondary"
//         target="_blank"
//         onClick={() => {
//           analytics.track("Website: Sample Github Clicked", selectedSample);
//         }}
//       >
//         Open on GitHub
//       </a>
//     </div>
//   </div>
// );
// }

interface Chip {
  bgColor: string;
  textColor: string;
  text: string;
}

export function SamplePageInner() {
  const sampleName = useParams()["sample-name"];
  return <div>Sample: {sampleName}</div>;
}

const SamplePageOuter = LoginRequired(function SamplePage() {
  return (
    <Loader>
      <SamplePageInner />
    </Loader>
  );
});

export default SamplePageOuter;
