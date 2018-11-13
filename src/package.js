/**
 * 打包 crx
 */
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const Worker = require('./worker');

const resolve = dir => (path.resolve(__dirname, dir));

const CLI = resolve('D:\\go-path\\src\\github.com\\mcuadros\\go-crxmake\\cli\\crxmake\\crxmake.exe'); // windows
const CHROME_MAC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // mac

const run = (...args) => spawn(...args).on('error', (e) => {
  console.log('args', args);
  console.log('error:', e);
});

const isWin32 = os.platform() === 'win32';
const RELEASE_DIR = resolve('../release');

module.exports = (SRC_DIR, PEM_DIR) => {
  const manifest = require('../src/manifest');

  const { name } = manifest;
  const { version } = manifest;

  const packerWin = () => run(CLI, [
    `${SRC_DIR}`,
    `--key-file=${PEM_DIR}`,
  ]);

  const packerMac = () => run(CHROME_MAC, [
    `--pack-extension=${SRC_DIR}`,
    `--pack-extension-key=${PEM_DIR}`,
  ]);

  const worker = new Worker({
    srcDir: SRC_DIR,
    releaseDir: RELEASE_DIR,
    releaseName: `${name}-v${version}.crx`,
    packer: isWin32 ? packerWin : packerMac,
  });

  worker.run();
}
