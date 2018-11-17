/**
 * 打包 crx
 */
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const Worker = require('./src/worker');
const util = require('./src/util');

const resolve = dir => (path.resolve(__dirname, dir));

const CLI = resolve('D:\\go-path\\src\\github.com\\mcuadros\\go-crxmake\\cli\\crxmake\\crxmake.exe'); // windows
const CHROME_MAC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // mac

const run = (...args) => spawn(...args).on('error', (e) => {
  console.log('args', args);
  console.log('error:', e);
});

const isWin32 = os.platform() === 'win32';

module.exports = (SRC_DIR, PEM_DIR, RELEASE_DIR, manifest) => {
  const {
    name,
    version,
  } = manifest;

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
    releaseName: `${util.formatName(name)}-v${version}.crx`,
    packer: isWin32 ? packerWin : packerMac,
  });

  worker.run();
}
