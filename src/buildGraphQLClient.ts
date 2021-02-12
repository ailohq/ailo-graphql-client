import { GraphQLClient, GraphQLClientOptions } from "./GraphQLClient";

/**
 * @deprecated Use `new GraphQLClient` instead.
 */
export function buildGraphQLClient(
  options: GraphQLClientOptions
): GraphQLClient {
  return new GraphQLClient(options);
}
