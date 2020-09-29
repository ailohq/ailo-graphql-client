import { Monitoring } from "@ailo/monitoring";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";

export function traceparentLink({
  monitoring,
}: {
  monitoring: Monitoring;
}): ApolloLink {
  return setContext((_, { headers }) => {
    const traceparent = monitoring.getCurrentTransaction()?.toTraceparent();
    return {
      headers: traceparent
        ? {
            ...headers,
            "Ailo-Traceparent": traceparent,
          }
        : headers,
    };
  });
}
