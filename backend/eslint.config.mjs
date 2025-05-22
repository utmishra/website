import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint' // Import TypeScript ESLint
import eslintJs from '@eslint/js' // Import default ESLint rules

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // This 'files' property here for FlatCompat is mostly for converting old configs.
  // We'll define the actual files to lint in the exported config array below.
})

export default tseslint.config(
  // 1. Apply recommended ESLint rules (like common best practices)
  eslintJs.configs.recommended,

  // 2. Apply recommended TypeScript ESLint rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic, // Optional: Adds stylistic TypeScript rules

  // 3. Convert and apply Prettier configuration
  // This should usually come last to ensure Prettier rules override others if there are conflicts
  ...compat.extends('prettier'),

  // 4. Define your project-specific configuration for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'], // Explicitly tell ESLint to lint all .ts and .tsx files
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Point to your tsconfig for type-aware linting
        sourceType: 'module',
      },
    },
    rules: {
      // Add your specific Nest.js or project rules here
      // For example, if you want to enforce specific naming conventions or disallow certain practices
      // '@typescript-eslint/interface-name-prefix': 'off',
      // '@typescript-eslint/explicit-function-return-type': 'off',
      // '@typescript-eslint/explicit-module-boundary-types': 'off',
      // '@typescript-eslint/no-explicit-any': 'off',
    },
    // 5. Define files/directories to ignore (crucial!)
    // These patterns are relative to the root where eslint.config.mjs is located
    ignores: [
      'dist/', // Ignore compiled output
      'node_modules/', // Ignore installed dependencies
      'coverage/', // Ignore test coverage reports
      // Any other files you absolutely don't want ESLint to touch, e.g., generated files
    ],
  },

  // You can add more specific configurations here, e.g., for test files:
  // {
  //   files: ["test/**/*.ts"],
  //   rules: {
  //     // Specific rules for test files
  //   }
  // }
)
