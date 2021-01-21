module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  plugins: ['react'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
}
