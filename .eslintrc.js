module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/recommended'
  ],
  rules: {
    'global-require': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'semi': ['error', 'never'],
    'no-extra-semi': 'error',
  }
}
