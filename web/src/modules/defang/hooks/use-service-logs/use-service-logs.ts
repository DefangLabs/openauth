import { useLogsFilter } from "@/app/service/[service-name]/hooks/use-logs-filter/use-logs-filter";
import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { parse } from "ansicolor";
import { useCallback, useEffect, useRef } from "react";
import { TailResponse } from "../../generated/fabric_pb";

interface UseServiceLogsOpts {
  etag?: string;
  service?: string;
  sinceMins?: number;
  logContainer?: HTMLDivElement | null;
}

export function useServiceLogs(opts: UseServiceLogsOpts) {
  const service = opts?.service;
  const etag = opts?.etag;
  const sinceMins = opts?.sinceMins;
  const client = useDefangClient();
  const container = opts.logContainer;
  const scrolledRef = useRef(false);
  const { filter, negativeFilter } = useLogsFilter();

  const resetLogs = useCallback(() => {
    if (container) {
      container.innerHTML = "";
    }
  }, [container]);

  useEffect(() => {
    resetLogs();
  }, [resetLogs, service, etag, sinceMins]);

  useEffect(() => {
    if (!container) return;
    // hide logs based on filter
    const logs = container.getElementsByClassName("log");
    Array.from(logs).forEach((log) => {
      const htmlLog = log as HTMLElement;
      if (filter) {
        if (negativeFilter) {
          htmlLog.style.display = log.textContent?.includes(filter)
            ? "none"
            : "block";
        } else {
          htmlLog.style.display = log.textContent?.includes(filter)
            ? "block"
            : "none";
        }
      } else {
        htmlLog.style.display = "block";
      }
    });
  }, [container, filter, negativeFilter]);

  const callback = useCallback(
    (res: TailResponse) => {
      // append logs to the container
      if (!container) {
        return;
      }

      const shouldScroll = !scrolledRef.current;

      res.entries.forEach((log) => {
        const div = document.createElement("div");
        div.classList.add("log");
        div.style.whiteSpace = "pre";

        div.appendChild(
          document.createTextNode(
            `[${log.timestamp?.toDate().toISOString()}]` + " "
          )
        );

        const parsedMessage = parse(log.message);
        parsedMessage.spans.forEach((span, i) => {
          const spanElement = document.createElement("span");
          spanElement.setAttribute("key", i.toString());
          spanElement.setAttribute("style", span.css);
          spanElement.textContent = span.text;

          div.appendChild(spanElement);
        });

        container.appendChild(div);
      });
      // scroll to bottom
      if (shouldScroll) {
        container.scrollTop = container.scrollHeight;
      }
    },
    [container]
  );

  useEffect(() => {
    if (!client || !container || (!service && !etag)) return;

    const stopTail = client.tail(
      {
        service,
        etag,
        since: sinceMins
          ? { seconds: BigInt(Math.floor(Date.now() / 1000) - 60 * sinceMins) }
          : undefined,
      },
      callback,
      () => {}
    );

    return () => {
      try {
        stopTail();
      } catch (e) {
        console.log("@@ error stopping tail", e);
      }
    };
  }, [callback, client, container, etag, service, sinceMins]);

  useEffect(() => {
    if (!container) return;

    container.scrollTop = container.scrollHeight;

    // on scroll check if we are at the bottom, if so set scrolled to false, else true
    function scrollCheck() {
      if (!container) return;
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 20
      ) {
        scrolledRef.current = false;
        console.log("@@ scrolled to bottom");
      } else {
        scrolledRef.current = true;
        console.log("@@ not scrolled to bottom");
      }
    }
    container.addEventListener("scroll", scrollCheck);

    return () => {
      container.removeEventListener("scroll", scrollCheck);
    };
  }, [container]);

  return {
    resetLogs,
  };
}
