module.exports = {
  // 去除文件名中的空格，用`-`替代
  formatName( name ){
    return name.replace(/\s+/g, '-')
  },
}