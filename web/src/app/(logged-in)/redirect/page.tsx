import { requireAuth } from "@/modules/auth/lib/require-auth";
import { Redirect } from "./components/redirect/redirect";

/**
 * The url to redirect to after login should be the url we're currently at
 * i.e. not the url in the search params, but this url WITH url=<whatever>
 * in the query string/search params. The client component will take care
 * of redirecting to that url after login. The reason is that at the moment
 * we only have the Defang client in the browser (though we can update that)
 * and it takes care of making sure the EULA is signed once the user is
 * logged in before completing the redirect.
 */
export default async function RedirectPage({
  searchParams,
}: {
  // url is the url to redirect to after login
  searchParams: Promise<{ url: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  const urlBuilder = new URL("http://tmp/redirect");
  urlBuilder.searchParams.set("url", awaitedSearchParams.url);
  // the redirectPath should be a relative path with the query string
  const redirectPath = urlBuilder.pathname + urlBuilder.search;
  await requireAuth({ redirectPath });
  return <Redirect />;
}
