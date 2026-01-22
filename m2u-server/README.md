# Mobilab2u Server 👋

## Features

- Swagger documentation generator for Fastify https://github.com/fastify/fastify-swagger
- Generates swagger/openapi specification based on jsDoc comments and YAML files. https://github.com/Surnet/swagger-jsdoc
- Mercurius is a GraphQL adapter for Fastify https://mercurius.dev/
- Code-GraphQL Nexus
  Declarative, Code-First GraphQL Schemas for JavaScript/TypeScript https://nexusjs.org
- Log and tracking with [hyperdxio/hyperdx](https://github.com/hyperdxio/hyperdx)
- And some useful plugins as https://github.com/fastify/fastify-env, https://github.com/fastify/fastify-cors, https://github.com/fastify/fastify-helmet

## Install

```sh
pnpm install
```

## Usage

```sh
pnpm start
```

## Swagger UI

Open below link on your browser with localhost
http://localhost:3000/documentation

![https://gyazo.com/6cf6c02cb36f9d4fababdde1ad071aba.gif](https://gyazo.com/6cf6c02cb36f9d4fababdde1ad071aba.gif)

## GraphQL Client IDE

Open below link on your browser with localhost
http://localhost:3000/altair

![https://gyazo.com/49e9af06a6a13390abefd5c58a1296f7.png](https://gyazo.com/49e9af06a6a13390abefd5c58a1296f7.png)

## GraphQL

If you are new to GraphQL, please watch the below video for more information.
[![IT Man - Talk #27 - GraphQL 2022 Report Insights [Vietnamese]](https://i.ytimg.com/vi/_wmldiEdwPM/hqdefault.jpg)](https://www.youtube.com/watch?v=_wmldiEdwPM)

Run below command in your terminal/CLI

```sh
curl -H "Content-Type:application/graphql" -XPOST -d "query { hello }" http://localhost:3000/graphql | jq .
```

Output:

```
{
  "data": {
    "hello": "Hello World!"
  }
}
```

## Run tests

```sh
pnpm test
```

## Pre-commit hooks

This project uses [Pre-commit](https://pre-commit.com/) to enforce code quality. You can install it by running:

```sh
pre-commit install
```

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc.

## References

- [jellydn/platformatic-starter: Platformatic starter template](https://github.com/jellydn/platformatic-starter)

## Author

👤 **Huynh Duc Dung**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)

Give a ⭐️ if this project helped you!

[![Stargazers repo roster for @jellydn/fastify-starter](https://reporoster.com/stars/jellydn/fastify-starter)](https://github.com/jellydn/fastify-starter/stargazers)
