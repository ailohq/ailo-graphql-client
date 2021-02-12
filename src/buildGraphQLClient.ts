import { Monitoring } from "@ailo/monitoring/build/main/Monitoring";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { FetchPolicy } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { authLink, GetAccessTokenFn } from "./links/authLink";
import { errorLink } from "./links/errorLink";
import { httpLink } from "./links/httpLink";
import { traceparentLink } from "./links/traceparentLink";
import { Logger } from "./utils/Logger";
import { ApolloClientWithThrownErrors } from "./ApolloClientWithThrownErrors";

export { GetAccessTokenFn, Logger };

export type GraphQLClient = ApolloClientWithThrownErrors<NormalizedCacheObject>;

export interface GraphQLClientOptions {
  uri: string;
  logger?: Logger;
  monitoring?: Monitoring;
  getAccessToken?: GetAccessTokenFn;
  defaultFetchPolicy?: FetchPolicy;
}

export function buildGraphQLClient({
  uri,
  logger = console,
  monitoring,
  getAccessToken,
  defaultFetchPolicy = "no-cache",
}: GraphQLClientOptions): GraphQLClient {
  return new ApolloClientWithThrownErrors({
    link: ApolloLink.from([
      ...(getAccessToken ? [authLink({ getAccessToken })] : []),
      ...(monitoring ? [traceparentLink({ monitoring })] : []),
      errorLink({ logger }),
      httpLink(uri),
    ]),

    cache: new InMemoryCache(),

    defaultOptions: {
      query: { errorPolicy: "all", fetchPolicy: defaultFetchPolicy },
      watchQuery: { errorPolicy: "all", fetchPolicy: defaultFetchPolicy },
      mutate: { errorPolicy: "all", fetchPolicy: defaultFetchPolicy },
    },
  });
}
