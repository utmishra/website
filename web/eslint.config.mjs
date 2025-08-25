import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  // Removed react-compiler plugin as it's not installed
  ...compat.config({
    rules: {
      // 'react-compiler/react-compiler': 'error',
    },
  }),
]

export default eslintConfig
