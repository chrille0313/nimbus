# @cloud-hub/vitest-config

**Centralized Testing Configuration for Cloud Projects**


![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) 



- ⚡ Vitest optimizations for TypeScript/React
- 📊 Built-in coverage configuration
- 🛠️ Pre-configured testing utilities
- 🔄 Shared global setup/teardown

## Installation

```bash
# Using npm
npm install --save-dev @cloud-hub/vitest-config vitest

# Using yarn
yarn add -D @cloud-hub/vitest-config vitest
```



## Configuration Presets

| Preset  | Includes                           | Best For         |
| ------- | ---------------------------------- | ---------------- |
| `base`  | DOM mocking, coverage, TS paths    | Node.js projects |
| `react` | React Testing Library, JSX support | React components |
| `edge`  | Web APIs, fetch mocking            | Edge runtime     |

**Recommended Scripts:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "coverage": "vitest run --coverage"
  }
}
```

## Testing Utilities

### Mock Services

```typescript
import { mockCloudService } from "@cloud-hub/vitest-config/mocks";

test("fetch data", async () => {
  mockCloudService("getUsers", [{ id: 1, name: "Test" }]);
  // Test implementation
});
```


## Version Compatibility

| Config Version | Vitest | React | Node |
| -------------- | ------ | ----- | ---- |
| 1.x            | 0.32+  | 18+   | 16+  |
| 2.x            | 1.0+   | 18+   | 18+  |


## License

Distributed under the MIT License. See `LICENSE` for more information.
