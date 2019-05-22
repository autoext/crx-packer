# crx-local-packer
> crx 本地打包工具

## Install
> npm i -D git+ssh://git@gitee.com:g8up/crx-local-packer.git#v1.1.1

## Usage
```js
/**
 * build/package.js
 * 打包 crx
 * npm i -D git+ssh://git@gitee.com:g8up/crx-local-packer.git#v1.1.1
 */
const path = require('path');
const CrxPaker = require('crx-local-packer');

const manifest = require('../dist/manifest');

const resolve = dir => (path.resolve(__dirname, dir));

const SRC_FOLDER_NAME = 'dist';
const SRC_DIR = resolve(`../${SRC_FOLDER_NAME}`);
const PEM_DIR = resolve('../dist.pem');
const RELEASE_DIR = resolve('../release');

CrxPaker(SRC_DIR, PEM_DIR, RELEASE_DIR, manifest );
```

- regist npm script
```
scripts:{
    "pack": "node build/package.js",
}
```

- run
> npm run pack

# Doc
- https://github.com/mcuadros/go-crxmake