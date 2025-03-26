# 📦 CloudHub OpenAPI Specification

This package provides an OpenAPI specification for the CloudHub API as a TypeScript object for easy consumption in TypeScript/JavaScript projects. It is currently bundled and structured to be compatible with ESM (import) environments only.

## 🔗 Setup and Installation

To install this package in another project within the monorepo, add the following to the projects `package.json`:

```json
"dependencies": {
  "@repo/openapi-spec": "*"
}
```

## 👨‍💻 Usage

### Importing in ES Modules

```ts
import OpenAPISpec from '@repo/openapi-spec';
console.log(OpenAPISpec);
```

<!-- ### Importing in CommonJS

```js
const OpenAPISpec = require('openapi-spec');
console.log(OpenAPISpec);
``` -->

## 🛠️ Development and Build Process

The OpenAPI specification is stored in `src/openapi.yaml`. It is bundled into a **single file** to ensure compatibility, but can be split into **multiple modular files** during development using tools like [**Redocly CLI**](https://redocly.com/docs/cli) (more [further down](#working-with-the-openapi-specification)).

### 📁 File Structure

```console
openapi-spec/
├── dist/                # Compiled output
├── src/
│   ├── openapi.yaml     # OpenAPI specification (bundled)
│   ├── openapi-types.ts # Generated TypeScript types
│   ├── index.ts         # Exports OpenAPI spec as JS object
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
├── ...
```

### 📦 Building the Package

For other projects to import the specification in TypeScript/JavaScript, the necessary types must be generated, and the TypeScript code must be compiled.

To build the package, run:

```console
npm run build
```

This will:

1. Generate TypeScript types from `src/openapi.yaml` into `src/openapi.d.ts`.

2. Compile the TypeScript code into `dist/`.

3. Copy the OpenAPI YAML file into `dist/`.

### 🔍 Watching For Changes

For a smoother development experience, the package includes a watch mode that monitors changes in `src/openapi.yaml` and `src/index.ts`, automatically rebuilding the package when updates are detected.

To start watching for changes, run:

```console
npm run dev
```

### 📝 Working with the OpenAPI Specification

The OpenAPI YAML file is bundled into a single file for compatibility reasons. However, for further development, it is recommended to **split the file into multiple modular files.** [**Redocly CLI**](https://redocly.com/docs/cli) (or any other relevant OpenAPI tool) can be used for this purpose. To split the file using [**Redocly CLI**](https://redocly.com/docs/cli), run:

```console
npx @redocly/cli split ./src/openapi.yaml --outDir ./src/split
```

Example output after splitting:

```console
src/
├── split/
│   ├── components/
│   │   ├── responses/
│   │   │   ├── ...
│   │   ├── schemas/
│   │   │   ├── ...
│   ├── paths/
│   │   ├── ...
│   ├── openapi.yaml # Contains referenes to components in the other files
├── index.ts
├── openapi.yaml     # Original bundled file
```

To bundle the files back into `openapi.yaml`, use:

```console
npx @redocly/cli bundle ./src/split/openapi.yaml -o ./src/openapi.yaml
```

This ensures that the final specification remains **modular during local development** but is **bundled for compatibility in production.**

> ℹ️ By only pushing the bundled file to git, other developers can use their preferred tool to work with the specification without worrying about format incompatibilities.

### 🚨 Linting

To ensure code quality and consistency, this package uses linting for both TypeScript code and the OpenAPI specification.

#### Running Linting

You can run the linting process by executing the following command:

```console
npm run lint
```

This will run both code and specification linting.

#### Linting Typescript Code

To lint only the TypeScript code, run:

```console
npm run lint:code
```

This command uses [ESLint](https://eslint.org/) to check the code for potential issues and enforce coding standards.

#### Linting OpenAPI Specification

To validate the OpenAPI specification, run:

```
npm run lint:specification
```

This command uses [Redocly CLI](https://www.npmjs.com/package/@scalar/cli) to ensure that `src/openapi.yaml` adheres to OpenAPI standards.

## 📜 License

This package is licensed under the [MIT License](LICENSE.md) (see LICENSE.md).
