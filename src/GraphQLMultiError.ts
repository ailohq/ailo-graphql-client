import { GraphQLError } from "graphql";

export class GraphQLMultiError extends Error {
  constructor(public gqlErrors: readonly GraphQLError[]) {
    super(gqlErrors.map((e) => e.message).join("\n"));
  }
}
