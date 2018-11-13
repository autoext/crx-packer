const fs = require('fs');

const del = (dir) => {
  if (fs.existsSync(dir)) {
    fs.unlinkSync(dir);
    console.warn(`[del]已删除：${dir}`);
  } else {
    console.warn(`[del]未找到文件：${dir}`);
  }
};

const rename = (oldPath, newPath) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.warn(`[ren]已命名：${newPath}`);
  } else {
    console.warn(`[ren]未找到文件：${oldPath}`);
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
    // this.releaseName = releaseName;
    this.packer = packer;

    this.releaseFile = `${this.releaseDir}/${releaseName}`;
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
    this.del();
    this.pack().on('close', () => {
      this.rename();
    });
  }
}

module.exports = Worker;
