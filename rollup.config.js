import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime'
      }
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime'
      }
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'WebsiteAnnotationTool',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime'
      }
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ],
};
