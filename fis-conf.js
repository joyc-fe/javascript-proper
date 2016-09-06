// 加载base配置
var baseFisConf = require("../fis-conf-base.js")
// 获取namespace
var namespace = baseFisConf.getNamespace(__dirname);

baseFisConf(namespace);