# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.2.7](https://github.com/ailohq/graphql-client/compare/v2.2.6...v2.2.7) (2021-05-05)


### Bug Fixes

* Improve the way ledger-service errors are shown ([51d3d79](https://github.com/ailohq/graphql-client/commit/51d3d79535f69ad801c71f1d84ef2b74cd95524e))

### [2.2.6](https://github.com/ailohq/graphql-client/compare/v2.2.5...v2.2.6) (2021-02-12)

### [2.2.5](https://github.com/ailohq/graphql-client/compare/v2.2.4...v2.2.5) (2021-02-12)

### [2.2.4](https://github.com/ailohq/graphql-client/compare/v2.2.3...v2.2.4) (2021-01-19)

### [2.2.3](https://github.com/ailohq/graphql-client/compare/v2.2.2...v2.2.3) (2020-12-17)

### [2.2.2](https://github.com/ailohq/graphql-client/compare/v2.2.1...v2.2.2) (2020-12-17)

### [2.2.1](https://github.com/ailohq/graphql-client/compare/v2.2.0...v2.2.1) (2020-09-29)


### Bug Fixes

* Export `GraphQLClientOptions` interface ([ac92402](https://github.com/ailohq/graphql-client/commit/ac92402afe09b57335d616282bf2acbe1bd01b2e))

## [2.2.0](https://github.com/ailohq/graphql-client/compare/v2.1.5...v2.2.0) (2020-09-29)


### Features

* Accept `monitoring` param and send `Ailo-Traceparent` header through if there is an ongoing monitoring transaction ([2477bf4](https://github.com/ailohq/graphql-client/commit/2477bf435b353732f5efc20784c5373fd3c9eba6))

### [2.1.5](https://github.com/ailohq/graphql-client/compare/v2.1.4...v2.1.5) (2020-07-23)

### [2.1.4](https://github.com/ailohq/graphql-client/compare/v2.1.3...v2.1.4) (2020-07-23)

### [2.1.3](https://github.com/ailohq/graphql-client/compare/v2.0.1...v2.1.3) (2020-07-23)

### [2.0.1](https://github.com/ailohq/graphql-client/compare/v2.0.0...v2.0.1) (2020-07-23)

## [2.0.0](https://github.com/ailohq/graphql-client/compare/v1.1.3...v2.0.0) (2020-07-23)


### ⚠ BREAKING CHANGES

* It will remove caching from existing clients unless you pass a different `fetchPolicy` to the client when initialiting it or to the query when querying.

### Features

* Do not cache query results by default ([243b4ac](https://github.com/ailohq/graphql-client/commit/243b4ac44a98cbb060c8c9df100ade1d57f0b4ce))

### [1.1.3](https://github.com/ailohq/ailo-graphql-client/compare/v1.1.1...v1.1.3) (2020-06-25)

### 1.1.1 (2020-06-25)

### Bug Fixes

- Make Logger interface align with winston logger ([b63de97](https://github.com/ailohq/ailo-graphql-client/commit/b63de972c1bda3ad6c24e7586de6846c97ea6814))
