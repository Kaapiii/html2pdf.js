// Import dependencies.
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import fs from 'fs';

function banner() {
  var text = pkg.name + ' v' + pkg.version + '\n';
  text += 'Copyright (c) ' + (new Date).getFullYear() + ' Erik Koopmans\n';
  text += 'Released under the ' + pkg.license + ' License';
  text = '/**\n * ' + text.replace(/\n/g, '\n * ') + '\n */\n';
  return { banner: text };
}
function license(filename) {
  filename = filename || './LICENSE';
  var data = fs.readFileSync(filename).toString();
  data = '/**\n * @license\n * ' + data.trim().replace(/\n/g, '\n * ') + '\n */\n';
  return { banner: data };
}

export default [
  // Bundled builds.
  {
    name: 'html2pdf',
    input: 'src/index.js',
    output: [
      { file: pkg.browser.replace(/js$/, 'bundle.js'), format: 'umd' }
    ],
    globals: {
      jspdf: 'jsPDF',
      html2canvas: 'html2canvas'
    },
    plugins: [
      resolve(),
      commonjs(),
      banner()
    ]
  },
  // Un-bundled builds.
  {
    name: 'html2pdf',
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
      { file: pkg.browser, format: 'umd' }
    ],
    external: [
      'jspdf',
      'html2canvas',
      'es6-promise/auto'
    ],
    globals: {
      jspdf: 'jsPDF',
      html2canvas: 'html2canvas'
    },
    plugins: [
      resolve(),
      commonjs(),
      banner()
    ]
  }
];
