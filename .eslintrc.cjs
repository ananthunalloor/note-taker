module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'mantine'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'unused-imports'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-console': 'error',
        'no-extra-parens': 'off',
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': 'error',
        'no-loss-of-precision': 'error',
        'no-promise-executor-return': 'error',
        'default-case': 'error',
        'no-alert': 'error',
        'comma-dangle': ['error', 'never'],
        'array-bracket-spacing': 'error',
        'block-spacing': ['error', 'always'],
        'brace-style': 'error',
        'comma-spacing': 'error',
        'computed-property-spacing': 'error',
        indent: ['error', 2],
        'jsx-quotes': ['error', 'prefer-single'],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'max-depth': 'error',
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': 'error',
        quotes: ['error', 'single'],
        semi: 'error',
        'semi-spacing': 'error',
        'semi-style': 'error',
        'space-before-blocks': 'error',
        'space-in-parens': 'error',
        'arrow-spacing': 'error',
        'no-duplicate-imports': 'error',
        'prefer-arrow-callback': 'error',
        'template-curly-spacing': 'error',
        'prefer-const': 'error',
        'unused-imports/no-unused-imports': 'error',
        'import/named': 'off',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-mutable-exports': 'error',
        'object-curly-spacing': ['error', 'always'],
        'no-multi-spaces': 'error',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_'
          }
        ],
        'max-len': [
          'error',
          {
            code: 100,
            comments: 150,
            tabWidth: 2,
            ignoreStrings: true,
            ignoreUrls: true
          }
        ],
        'import/order': [
          'error',
          {
            groups: ['external', 'internal', ['index', 'sibling', 'parent', 'object']],
            pathGroupsExcludedImportTypes: ['builtin'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true }
          }
        ],
        '@typescript-eslint/no-explicit-any': 'error'
      }
    }
  ]
};
