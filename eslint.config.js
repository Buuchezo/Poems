// eslint.config.js
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import prettierPlugin from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'
import babelParser from '@babel/eslint-parser'

export default [
  // File matching & ignoring
  {
    files: ['**/*.{js,vue}'],
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },

  // Base language options
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false, // for @babel/eslint-parser
        babelOptions: {
          presets: ['@babel/preset-env'],
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },

  // Core JS rules
  js.configs.recommended,

  // Vue plugin: essential rules (you can switch to flat/recommended if needed)
  ...pluginVue.configs['flat/essential'],

  // Prettier: disables conflicting formatting rules
  skipFormatting,

  // Prettier plugin to show formatting issues as warnings
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]
