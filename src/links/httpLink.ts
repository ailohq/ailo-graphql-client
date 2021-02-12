import fetch from "cross-fetch";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { ApolloLink, Operation, selectURI } from "@apollo/client/core";

const httpLink = (graphqlUri: string): ApolloLink => {
  return new BatchHttpLink({
    fetch,
    uri: graphqlUri,
    batchKey: (operation: Operation): string => {
      const context = operation.getContext();
      const contextConfig = {
        http: context.http,
        options: context.fetchOptions,
        credentials: context.credentials,
        headers: context.headers,
      };
      return (
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        selectURI(operation, graphqlUri) +
        JSON.stringify(contextConfig) +
        operation.operationName
      );
    },
  });
};

export { httpLink };
