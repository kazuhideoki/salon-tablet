// 【PWA対応】withOffline を読み込む
//github.com/hanford/next-offline

https: var withOffline = require("next-offline");

var nextConfig = { dontAutoRegisterSw: true }


// nextConfig を withOffline に渡す
module.exports = withOffline(nextConfig);
