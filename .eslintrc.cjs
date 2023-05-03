/** @type {import('eslint').ESLint.ConfigData } */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["vue", "@typescript-eslint"],
  overrides: [
    {
      files: ["**/*.vue"],
      parser: "vue-eslint-parser",
      extends: [
        "plugin:vue/vue3-essential",
        "@vue/eslint-config-typescript/recommended",
        "@vue/eslint-config-prettier",
      ],
    },
  ],
};
