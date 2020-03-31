<p align="center">
    <img src="https://raw.githubusercontent.com/goex-top/cryptoassetsweb/master/public/favicon.ico">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.13.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/goex-top/cryptoassetsweb/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://www.travis-ci.com/goex-top/cryptoassetsweb">
    <img src="https://www.travis-ci.com/goex-top/cryptoassetsweb.svg?branch=master" alt="build status">
  </a>
</p>

# 资产显示


> 基于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 管理后台改制。

![image](https://raw.githubusercontent.com/goex-top/cryptoassetsweb/master/assets.gif)

## 快速上手

配合[后台](https://github.com/goex-top/cryptoassets)使用, https://github.com/goex-top/cryptoassets

## 配置

后端端口为`9000`

用nginx代理配置如下
```bash
server {
        listen 8001;
        listen [::]:8001;

        server_name localhost;
        access_log /yourpath/cryptoassetsweb/dist/crypt.log;
        charset utf-8;
        location / {
                root /yourpath/cryptoassetsweb/dist;
                index index.html;
                try_files $uri $uri/ /index.html;
        }

        location /api {
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_set_header Host $http_host;
                proxy_pass http://127.0.0.1:9000/api;
        }
}
```

### 配置用户api Key

## 显示

### 每日资产简报

### 资产明细

## 使用

### 编译

```bash
# 克隆项目
git clone https://github.com/goex-top/cryptoassetsweb.git

# 进入项目目录
cd cryptoassetsweb

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9001](http://localhost:9001)

### 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

### 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

### 浏览器支持

主流浏览器 和 Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
