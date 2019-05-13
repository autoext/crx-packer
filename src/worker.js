const fs = require('fs');

const del = (dir) => {
  if (fs.existsSync(dir)) {
    fs.unlinkSync(dir);
    return {
      error: false,
      message: `[del]已删除：${dir}`,
    };
  }
  else {
    return {
      error: true,
      message: `[del]未找到文件：${dir}`,
    };
  }
};

const rename = (oldPath, newPath) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    return {
      error: false,
      message: `[ren]已命名：${newPath}`,
    };
  }
  else {
    return {
      error: true,
      message: `[ren]未找到文件：${oldPath}`,
    };
  }
};

class Worker {
  constructor({
    srcDir,
    releaseDir,
    releaseName, // 发布的标准名称（带版本号）
    packer, // 打包函数
  }) {
    this.srcDir = srcDir;
    this.releaseDir = releaseDir;
    this.packer = packer;

    this.releaseFile = path.join(this.releaseDir, releaseName);
  }

  del() {
    del(this.releaseFile);
  }

  pack() {
    return this.packer();
  }

  rename() {
    if (!fs.existsSync(this.releaseDir)) {
      fs.mkdirSync(this.releaseDir);
    }
    rename(`${this.srcDir}.crx`, this.releaseFile);
  }

  run() {
    const {
      error,
      message,
    } = this.del();
    if( error ){
      console.warn( message );
    }
    this.pack().on('close', () => {
      this.rename();
    });
  }
}

module.exports = Worker;
