/**
 * The UI that's displayed when loading the root page of the OpenAuth server. You can configure
 * which providers should be displayed in the select UI.
 *
 * ```ts
 * import { Select } from "@openauthjs/openauth/ui/select"
 *
 * export default issuer({
 *   select: Select({
 *     providers: {
 *       github: {
 *         hide: true
 *       },
 *       google: {
 *         display: "Google"
 *       }
 *     }
 *   })
 *   // ...
 * })
 * ```
 *
 * @packageDocumentation
 */
/** @jsxImportSource hono/jsx */

import { Layout } from "./layout"

export interface SelectProps {
  /**
   * An object with all the providers and their config; where the key is the provider name.
   *
   * @example
   * ```ts
   * {
   *   github: {
   *     hide: true
   *   },
   *   google: {
   *     display: "Google"
   *   }
   * }
   * ```
   */
  providers?: Record<
    string,
    {
      /**
       * Whether to hide the provider from the select UI.
       * @default false
       */
      hide?: boolean
      /**
       * The display name of the provider.
       */
      display?: string
    }
  >
}

export function Select(props?: SelectProps) {
  return async (
    providers: Record<string, string>,
    _req: Request,
  ): Promise<Response> => {
    const jsx = (
      <Layout>
        <div data-component="form">
          {Object.entries(providers).map(([key, type]) => {
            const match = props?.providers?.[key]
            if (match?.hide) return
            const icon = ICON[key]
            return (
              <a
                href={`/${key}/authorize`}
                data-component="button"
              >
                {icon && <i data-slot="icon">{icon}</i>}
                Continue with {match?.display || DISPLAY[type] || type}
              </a>
            )
          })}
          <div data-component="terms-of-service">
            By proceeding you are agreeing to our{" "}
            <a
              href="https://defang.io/terms-conditions.html"
              target="_blank"
              rel="noopener noreferrer"
              data-color="primary"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </Layout>
    )

    return new Response(jsx.toString(), {
      headers: {
        "Content-Type": "text/html",
      },
    })
  }
}

const DISPLAY: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  gitlab: "GitLab",
}

const ICON: Record<string, any> = {
  code: (
    <svg
      fill="currentColor"
      viewBox="0 0 52 52"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.55,36.91A6.55,6.55,0,1,1,2,43.45,6.54,6.54,0,0,1,8.55,36.91Zm17.45,0a6.55,6.55,0,1,1-6.55,6.54A6.55,6.55,0,0,1,26,36.91Zm17.45,0a6.55,6.55,0,1,1-6.54,6.54A6.54,6.54,0,0,1,43.45,36.91ZM8.55,19.45A6.55,6.55,0,1,1,2,26,6.55,6.55,0,0,1,8.55,19.45Zm17.45,0A6.55,6.55,0,1,1,19.45,26,6.56,6.56,0,0,1,26,19.45Zm17.45,0A6.55,6.55,0,1,1,36.91,26,6.55,6.55,0,0,1,43.45,19.45ZM8.55,2A6.55,6.55,0,1,1,2,8.55,6.54,6.54,0,0,1,8.55,2ZM26,2a6.55,6.55,0,1,1-6.55,6.55A6.55,6.55,0,0,1,26,2ZM43.45,2a6.55,6.55,0,1,1-6.54,6.55A6.55,6.55,0,0,1,43.45,2Z"
        fill-rule="evenodd"
      />
    </svg>
  ),
  google: (
    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  github: (
    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  gitlab: (
    // svg from https://about.gitlab.com/press/press-kit/ with some modifications
    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="380" height="380" viewBox="0 0 380 380">
      <g transform="translate(190, 190) scale(2.5) translate(-190, -190)">
        <path fill="currentColor" d="M265.26416,174.37243l-.2134-.55822-21.19899-55.30908c-.4236-1.08359-1.18542-1.99642-2.17699-2.62689-.98837-.63373-2.14749-.93253-3.32305-.87014-1.1689.06239-2.29195.48925-3.20809,1.21821-.90957.73554-1.56629,1.73047-1.87493,2.85346l-14.31327,43.80662h-57.90965l-14.31327-43.80662c-.30864-1.12299-.96536-2.11791-1.87493-2.85346-.91614-.72895-2.03911-1.15582-3.20809-1.21821-1.17548-.06239-2.33468.23641-3.32297.87014-.99166.63047-1.75348,1.5433-2.17707,2.62689l-21.19891,55.31237-.21348.55493c-6.28158,16.38521-.92929,34.90803,13.05891,45.48782.02621.01641.04922.03611.07552.05582l.18719.14119,32.29094,24.17392,15.97151,12.09024,9.71951,7.34871c2.34117,1.77316,5.57877,1.77316,7.92002,0l9.71943-7.34871,15.96822-12.09024,32.48142-24.31511c.02958-.02299.05588-.04269.08538-.06568,13.97834-10.57977,19.32735-29.09604,13.04905-45.47796Z"/>
        <path fill="currentColor" d="M265.26416,174.37243l-.2134-.55822c-10.5174,2.16062-20.20405,6.6099-28.49844,12.81593-.1346.0985-25.20497,19.05805-46.55171,35.19699,15.84998,11.98517,29.6477,22.40405,29.6477,22.40405l32.48142-24.31511c.02958-.02299.05588-.04269.08538-.06568,13.97834-10.57977,19.32735-29.09604,13.04905-45.47796Z"/>
        <path fill="currentColor" d="M160.34962,244.23117l15.97151,12.09024,9.71951,7.34871c2.34117,1.77316,5.57877,1.77316,7.92002,0l9.71943-7.34871,15.96822-12.09024s-13.79772-10.41888-29.6477-22.40405c-15.85327,11.98517-29.65099,22.40405-29.65099,22.40405Z"/>
        <path fill="currentColor" d="M143.44561,186.63014c-8.29111-6.20274-17.97446-10.65531-28.49507-12.81264l-.21348.55493c-6.28158,16.38521-.92929,34.90803,13.05891,45.48782.02621.01641.04922.03611.07552.05582l.18719.14119,32.29094,24.17392s13.79772-10.41888,29.65099-22.40405c-21.34673-16.13894-46.42031-35.09848-46.55499-35.19699Z"/>
      </g>
    </svg>
  ),
}
