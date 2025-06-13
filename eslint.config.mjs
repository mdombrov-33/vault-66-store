import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: ['lib/generated/prisma', 'node_modules', 'dist', '.next'],
  },

  ...compat.extends('next/core-web-vitals', 'plugin:prettier/recommended', 'next/typescript'),

  {
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]

export default eslintConfig
