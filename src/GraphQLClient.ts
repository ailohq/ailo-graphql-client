import { Monitoring } from "@ailo/monitoring/build/main/Monitoring";
import {
  ApolloLink,
  FetchPolicy,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { authLink, GetAccessTokenFn } from "./links/authLink";
import { errorLink } from "./links/errorLink";
import { httpLink } from "./links/httpLink";
import { traceparentLink } from "./links/traceparentLink";
import { Logger } from "./utils/Logger";
import { ApolloClientWithThrownErrors } from "./ApolloClientWithThrownErrors";
import { loggerLink } from "./links/loggerLink";

export { GetAccessTokenFn, Logger };

export interface GraphQLClientOptions {
  name?: string;
  version?: string;
  uri: string;
  logger?: Logger;
  monitoring?: Monitoring;
  getAccessToken?: GetAccessTokenFn;
  defaultFetchPolicy?: FetchPolicy;
}

export class GraphQLClient extends ApolloClientWithThrownErrors<NormalizedCacheObject> {
  constructor({
    uri,
    logger = console,
    monitoring,
    getAccessToken,
    defaultFetchPolicy = "no-cache",
    ...props
  }: GraphQLClientOptions) {
    super({
      ...props,

      link: ApolloLink.from([
        ...(getAccessToken ? [authLink({ getAccessToken })] : []),
        ...(monitoring ? [traceparentLink({ monitoring })] : []),
        loggerLink({ logger }),
        errorLink({ logger }),
        httpLink(uri),
      ]),

      cache: new InMemoryCache(),

      defaultOptions: {
        query: { errorPolicy: "all", fetchPolicy: defaultFetchPolicy },
        watchQuery: { errorPolicy: "all", fetchPolicy: defaultFetchPolicy },
        mutate: {
          errorPolicy: "all",
          fetchPolicy:
            defaultFetchPolicy === "no-cache" ? "no-cache" : undefined,
        },
      },
    });
  }
}
