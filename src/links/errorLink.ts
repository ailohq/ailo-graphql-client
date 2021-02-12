import { ApolloLink } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { Logger } from "../utils/Logger";

export function errorLink({ logger }: { logger: Logger }): ApolloLink {
  return onError((error): void => {
    const { graphQLErrors, networkError } = error;

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        logger.error(
          `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      logger.error("[GraphQL Network Error]: %O", networkError);
    }
  });
}
