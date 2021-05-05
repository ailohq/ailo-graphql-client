import {
  ApolloClient,
  ApolloQueryResult,
  MutationOptions,
  OperationVariables,
  QueryOptions,
  FetchResult,
} from "@apollo/client/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLError } from "graphql";

export class ApolloClientWithThrownErrors<
  TCacheShape
> extends ApolloClient<TCacheShape> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async query<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>,
    { throwOnError = true } = {}
  ): Promise<ApolloQueryResult<T>> {
    const response = await super.query(options);
    if (throwOnError) {
      if (response.error) {
        throw response.error;
      }
      this.throwResponseErrorIfExists(response);
    }
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async mutate<T = any, TVariables = OperationVariables>(
    options: MutationOptions<T, TVariables>,
    { throwOnError = true } = {}
  ): Promise<FetchResult<T>> {
    const response = await super.mutate(options);
    if (throwOnError) {
      this.throwResponseErrorIfExists(response);
    }
    return response;
  }

  private throwResponseErrorIfExists({
    errors,
  }: {
    errors?: ReadonlyArray<GraphQLError>;
  }): void {
    if (errors && errors.length > 0) {
      const error = errors[0];
      const body = error.extensions?.response?.body;
      if (body?.message || body?.errors) {
        throw new GraphQLError(
          body?.errors ? JSON.stringify(body.errors) : body.message,
          error.nodes,
          error.source,
          error.positions,
          error.path,
          error.originalError,
          error.extensions
        );
      }

      if (!(error instanceof GraphQLError)) {
        throw new GraphQLError(
          (error as GraphQLError).message,
          (error as GraphQLError).nodes,
          (error as GraphQLError).source,
          (error as GraphQLError).positions,
          (error as GraphQLError).path,
          (error as GraphQLError).originalError,
          (error as GraphQLError).extensions
        );
      }

      throw error;
    }
  }
}
