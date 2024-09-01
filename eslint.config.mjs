import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': 'warn', // Warn on console statements
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'always'], // Enforce semicolons
      'indent': ['error', 2], // Enforce 2-space indentation
      'no-unused-vars': ['warn', { 'args': 'none' }], // Warn on unused variables, ignoring unused function arguments
      'eqeqeq': ['error', 'always'], // Enforce strict equality (=== and !==)
      // 'no-magic-numbers': ['warn', { 'ignore': [0, 1] }], // Warn on magic numbers except 0 and 1
      // 'max-len': ['warn', { 'code': 150 }] // Warn if a line exceeds 80 characters
    }
  }
];