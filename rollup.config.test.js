import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
const test_config = {
  input: 'test/main.js',
  output: {
    file: 'test/dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
};

export default test_config