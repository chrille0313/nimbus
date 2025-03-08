import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import type { paths, components, operations } from './openapi';

export interface OpenAPI {
  paths: paths;
  components: components;
  operations: operations;
}

const filePath = path.join(__dirname, 'openapi.yaml');
const fileContents = fs.readFileSync(filePath, 'utf8');
const openapiSpec: OpenAPI = YAML.parse(fileContents);

export default openapiSpec;
