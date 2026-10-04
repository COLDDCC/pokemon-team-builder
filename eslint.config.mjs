import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
export default defineConfig({ ignores: ['dist/**', '.astro/**', 'node_modules/**'] }, js.configs.recommended, ...ts.configs.recommended, ...astro.configs.recommended, { languageOptions: { globals: { ...globals.browser, ...globals.node } } });
