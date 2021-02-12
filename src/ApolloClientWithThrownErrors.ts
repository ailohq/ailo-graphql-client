import {
  ApolloClient,
  ApolloQueryResult,
  MutationOptions,
  OperationVariables,
  QueryOptions,
} from "apollo-client";
import { FetchResult } from "apollo-link";
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLError } from "graphql";

export class ApolloClientWithThrownErrors<
  TCacheShape
> extends ApolloClient<TCacheShape> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async query<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables>,
    { throwOnError = true } = {}
  ): Promise<ApolloQueryResult<T>> {
    const response = await super.query(options);
    if (throwOnError) {
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
      const body = errors[0].extensions?.response?.body;
      const bodyError = body?.errors;
      if (bodyError) {
        throw bodyError;
      }
      throw errors[0];
    }
  }
}
