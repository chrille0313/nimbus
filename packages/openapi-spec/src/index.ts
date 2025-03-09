import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import type { paths, components, operations } from './openapi';
import { fileURLToPath } from 'url';

export interface OpenAPI {
  paths: paths;
  components: components;
  operations: operations;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'openapi.yaml');
const fileContents = fs.readFileSync(filePath, 'utf8');
const openApiSpec: OpenAPI = YAML.parse(fileContents);
export default openApiSpec;
