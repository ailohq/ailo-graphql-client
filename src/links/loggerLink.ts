import { ApolloLink, Operation } from "@apollo/client/core";
import { Logger } from "../utils/Logger";

export function getOperationType(
  operation: Operation
): "query" | "mutation" | "subscription" | "operation" {
  const definition = operation.query.definitions[0];
  if (definition?.kind === "OperationDefinition") {
    return definition.operation;
  }
  return "operation";
}

export function loggerLink({ logger }: { logger: Logger }): ApolloLink {
  return new ApolloLink((operation, forward) => {
    const { operationName } = operation;
    const operationType = getOperationType(operation);
    const debugLevel =
      operationName === "IntrospectionQuery"
        ? ("debug" as const)
        : ("info" as const);
    const requestTimestamp = Date.now();

    logger?.[debugLevel](`--> ${operationType} ${operationName}`);

    return forward(operation).map((response) => {
      const status =
        response.errors && response.errors.length > 0 ? "error" : "ok";
      const responseTimeInMs = Date.now() - requestTimestamp;
      logger?.[debugLevel](
        `<-- ${operationType} ${operationName} - status=${status} duration=${responseTimeInMs}ms`
      );

      return response;
    });
  });
}
