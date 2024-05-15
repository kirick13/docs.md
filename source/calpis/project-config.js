
import YAML             from 'yaml';
import { OPTIONS_PATH } from './options.js';

const file = Bun.file(`${OPTIONS_PATH}/source/config.yml`);
const text = await file.text();

export const project_config = YAML.parse(text);
