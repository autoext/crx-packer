const path = require("path");

const pack = require('../index')
const manifest = require('./example/dist/manifest')

const resolver = (dir)=>{
  return path.resolve(__dirname, dir);
};

const SRC_DIR = resolver('./example/dist')

const PEM_DIR = resolver('./example/dist.pem');

const RELEASE_DIR = resolver('./release');

pack(SRC_DIR, PEM_DIR, RELEASE_DIR, manifest)
.then((data)=>{
  console.log(`releaseFile`, data.releaseFile);
});