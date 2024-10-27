module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
     "arrow-body-style": "off",
     "no-console" : "off",
     "no-else-return" : "off",
     "consistent-return" : "off",
     "no-useless-return" : "off",
     "@typescript-eslint/no-unused-vars": "off",
     "radix" : "off",
  },
};
