import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const source_config = {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    paths: {
      zrender: 'zrender/dist/zrender.min.js'
    }
  },
  plugins: [
    nodeResolve(),
  ],
};
const test_config = {
  input: 'test/main.js',
  output: {
    file: 'test/bundle.js',
    format: 'cjs',
  },
  plugins: [
    nodeResolve(),
  ],
};

export default [source_config, test_config]