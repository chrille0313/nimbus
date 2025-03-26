# @cloud-hub/eslint-config

**Centralized Linting Solutions for Cloud Projects**

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Features

- 🧹 Unified linting rules across monorepo
- ⚙️ Multi-environment presets (Base/Next.js/React)
- 🔍 TypeScript-aware linting out-of-the-box
- 🛡️ Security-focused rule sets
- 💅 Consistent code style enforcement

---

## Installation

```bash
# Base installation
npm install --save-dev eslint @cloud-hub/eslint-config

# Full setup with React/TypeScript
npm install --save-dev eslint @cloud-hub/eslint-config \
  eslint-plugin-react eslint-plugin-react-hooks \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

---

## Configuration Presets

### Quick Start Guide

**Next.js Application** (`.eslintrc.cjs`)

```javascript
module.exports = {
  extends: ["@cloud-hub/eslint-config/next"],
  rules: {
    // Custom overrides
  },
};
```

**React Component Library** (`.eslintrc.cjs`)

```javascript
module.exports = {
  extends: ["@cloud-hub/eslint-config/react-internal"],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
```


## Core Rule Sets

**Essential React Rules:**

```javascript
{
  "react/jsx-uses-react": "error",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn"
}
```

**TypeScript Foundation:**

```javascript
{
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/consistent-type-imports": "error",
  "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
}
```

---

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

