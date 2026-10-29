// ESLint 9 requer o formato "flat config" — substitui o antigo .eslintrc.js
const tseslint = require('@typescript-eslint/eslint-plugin');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    ignores: ['dist/**', 'coverage/**', 'eslint.config.js'],
  },
  // traz o parser, o plugin e as regras recommended do typescript-eslint
  ...tseslint.configs['flat/recommended'],
  prettierRecommended,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // parâmetros/variáveis prefixados com _ são intencionalmente não usados
      // (ex.: placeholders da migração de módulos)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // migrações TypeORM já aplicadas são scripts históricos one-shot:
    // nem lint de variáveis nem reformatar (evita churn nos arquivos)
    files: ['src/migrations/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prettier/prettier': 'off',
    },
  },
];
