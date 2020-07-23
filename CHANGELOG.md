# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
