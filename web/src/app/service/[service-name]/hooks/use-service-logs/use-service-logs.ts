import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { parse } from "ansicolor";
import { useCallback, useEffect, useRef } from "react";
import { TailResponse } from "../../../../../modules/defang/generated/fabric_pb";
import { useLogsFilter } from "../use-logs-filter/use-logs-filter";

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

  const filterLogs = useCallback(() => {
    if (container) {
      const logs = container.getElementsByClassName("log");
      Array.from(logs).forEach((log) => {
        const htmlLog = log as HTMLElement;
        if (filter) {
          const lcFilter = filter?.toLowerCase() || "";
          if (negativeFilter) {
            htmlLog.style.display = log.textContent
              ?.toLowerCase()
              .includes(lcFilter)
              ? "none"
              : "block";
          } else {
            htmlLog.style.display = log.textContent
              ?.toLowerCase()
              .includes(lcFilter)
              ? "block"
              : "none";
          }
        } else {
          htmlLog.style.display = "block";
        }
      });
    }
  }, [container, filter, negativeFilter]);

  const resetLogs = useCallback(() => {
    if (container) {
      container.innerHTML = "";
    }
  }, [container]);

  useEffect(() => {
    resetLogs();
  }, [resetLogs, service, etag, sinceMins]);

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

        const timestampSpan = document.createElement("span");
        timestampSpan.setAttribute("style", "color: #8bc34a;");
        const date = log.timestamp?.toDate() || new Date();
        const offset = -date.getTimezoneOffset();
        const offsetSign = offset >= 0 ? "+" : "-";
        const offsetHours = Math.floor(Math.abs(offset / 60))
          .toString()
          .padStart(2, "0");
        const offsetMinutes = (Math.abs(offset) % 60)
          .toString()
          .padStart(2, "0");
        const localISOTime = new Date(date.getTime() + offset * 60000)
          .toISOString()
          .slice(0, -1);
        timestampSpan.textContent = `[${localISOTime}${offsetSign}${offsetHours}:${offsetMinutes}] `;
        div.appendChild(timestampSpan);

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

      filterLogs();
      // scroll to bottom
      if (shouldScroll) {
        container.scrollTop = container.scrollHeight;
      }
    },
    [container, filterLogs]
  );

  useEffect(() => {
    if (!client || !container || (!service && !etag)) return;

    const stopTail = client.tail(
      {
        services: service ? [service] : undefined,
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
      } else {
        scrolledRef.current = true;
      }
    }
    container.addEventListener("scroll", scrollCheck);

    return () => {
      container.removeEventListener("scroll", scrollCheck);
    };
  }, [container]);

  return {
    filterLogs,
    resetLogs,
  };
}
