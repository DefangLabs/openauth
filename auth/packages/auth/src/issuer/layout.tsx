import { PropsWithChildren } from "hono/jsx";
import css from "./ui.css" assert { type: "text" }
import LogoLight from "./logo-light";
import LogoDark from "./logo-dark";
import Tickbox from "./tickbox";

export function Layout(props: PropsWithChildren) {
  return (
    <html lang="en" style={{ "--border-radius": "2" }}>
      <head>
        <title>Login to Defang</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: css }} />
        <link rel="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" />
        {/* <link rel="icon" href={theme?.favicon} /> */}
      </head>
      <body>
        <div data-component="root">
          <main data-component="center">
            <div data-component="center-content">
              {/* @ts-expect-error Rendering SVG component */}
              <LogoDark data-component="logo" data-mode="dark" style={{ margin: "0 auto 2rem auto", height: "auto", maxWidth: "12rem" }} />
              {/* @ts-expect-error Rendering SVG component */}
              <LogoLight data-component="logo" data-mode="light" style={{ margin: "0 auto 2rem auto", height: "auto", maxWidth: "12rem" }} />
              {props.children}
            </div>
          </main>
          <aside data-component="aside">
            <AsideContent title="Private &amp; Secure">
              Deploy on your own cloud with full control&mdash;we never access your code or data.
            </AsideContent>
            <AsideContent title="Built for Developers">
              Seamless Docker &amp; Compose integration, optimized for real-world workflows.
            </AsideContent>
            <AsideContent title="Scale on Your Terms">
                Deploy to AWS, GCP, or DigitalOcean. More coming soon.
            </AsideContent>
          </aside>
        </div>
      </body>
    </html>
  );
}

function AsideContent(props: PropsWithChildren<{ title: string }>) {
  return (
    <div data-component="aside-content">
      {/* @ts-expect-error Rendering SVG component */}
      <Tickbox />
      <div>
        <h2>{props.title}</h2>
        <p>
          {props.children}
        </p>
      </div>
    </div>
  );
}
