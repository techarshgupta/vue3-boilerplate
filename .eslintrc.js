/**
 * @author Harsh Gupta
*/

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    eqeqeq: [
      "error",
      "always",
      {
        null: "always",
      },
    ],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    quotes: ["error", "single", { avoidEscape: true }],
    "comma-dangle": ["error", "only-multiline"],

    "max-len": [
      "error",
      {
        code: 100,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      }
    ],

    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],

    // vue rules
    "vue/custom-event-name-casing": "off",
    "vue/valid-v-slot": "warn",
    "vue/no-mutating-props": "warn",

    "no-plusplus": "off",
    "no-var": "error",
    "no-use-before-define": ["error", {"functions": true, "classes": true}]
  },
};
