import { ApolloLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

export type GetAccessTokenFn = () =>
  | string
  | undefined
  | Promise<string | undefined>;

export function authLink({
  getAccessToken,
}: {
  getAccessToken: GetAccessTokenFn;
}): ApolloLink {
  return setContext(async (_, { headers }) => {
    const token = await getAccessToken();
    if (!token) {
      return { headers };
    }

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });
}
