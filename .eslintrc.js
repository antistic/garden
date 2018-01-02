module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/recommended'
  ],
  rules: {
    // airbnb
    'global-require': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'semi': ['error', 'never'],
    'no-extra-semi': 'error',
    // vue
    'vue/max-attributes-per-line': ['error', {
      'singleline': 2,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      }
    }]
  }
}
