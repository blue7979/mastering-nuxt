/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'import/prefer-default-export': 'off',
    // 타입스크립트만 사용 가능
    // 'vue/block-lang': ['error',
    //   {
    //     script: {
    //       lang: 'ts',
    //     },
    //   },
    // ],
    // Vue파일의 함수에서 파라메터 재선언 가능
    'no-param-reassign': [2, { props: false }],
    // Script => Template => Style 순서로만 작성
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.vue'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
};
