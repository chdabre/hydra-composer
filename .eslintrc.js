module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'template-curly-spacing': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'max-len': ['warn', 150],
    radix: ['error', 'as-needed'],
  },
};
