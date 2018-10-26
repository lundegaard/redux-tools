const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs';
const loose = true;

module.exports = {
  presets: [['@babel/env', { loose, modules: false }]],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose }],
    ['@babel/plugin-proposal-object-rest-spread', { loose }],
    '@babel/plugin-transform-react-jsx',
    cjs && ['@babel/plugin-transform-modules-commonjs', { loose }],
    ['@babel/plugin-transform-runtime', { useESModules: !cjs }],
  ].filter(Boolean),
};
