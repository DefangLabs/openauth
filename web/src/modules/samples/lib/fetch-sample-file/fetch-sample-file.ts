const RAW_REPO_BASE = "https://raw.githubusercontent.com/DefangSamples/sample-";

function getSampleTemplateRepoUrl(sampleName: string) {
  return `${RAW_REPO_BASE}${sampleName}-template`;
}

interface FetchSampleFileParams {
  sampleName: string;
  branch: string;
  path: string;
}

export function fetchSampleFile({
  sampleName,
  branch,
  path,
}: FetchSampleFileParams) {
  const repo = getSampleTemplateRepoUrl(sampleName);
  return fetch(`${repo}/${branch}/${path}`);
}
