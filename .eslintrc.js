module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "no-lonely-if": "warn",
    "semi": ["error", "always"],
    "no-await-in-loop": "off",
    "no-extra-semi": "warn",
    "semi-style": ["error", "last"]
  }
}
