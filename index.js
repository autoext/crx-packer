/**
 * 打包 crx
 * 依赖：https://www.npmjs.com/package/crx
 */

const fs = require("fs");
const ChromeExtension = require("crx");
const util = require('./src/util');

module.exports = (SRC_DIR, PEM_DIR, RELEASE_DIR, manifest) => {
  const {
    name,
    version,
  } = manifest;
  const releaseName = `${util.formatName(name)}-v${version}.crx`;

  const crx = new ChromeExtension({
    // codebase: "http://localhost:8000/myFirstExtension.crx",
    privateKey: fs.readFileSync(PEM_DIR),
  });

  crx.load(SRC_DIR)
    .then(crx => crx.pack())
    .then(crxBuffer => {
      fs.writeFileSync(`${RELEASE_DIR}/${releaseName}`, crxBuffer);
    }).catch(err => {
      console.error(err);
    });
};

