
# link2data

## 部署

### 环境
```
# 安装node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
nvm install v6.11.4
nvm use node
# 安装pm2
npm install pm2 -gd
```
### server
```
# 文件位置
/home/shxy/link2data/server
# 包安装
npm i express
npm i cors
npm i moment
npm i jwt-simple
npm i mysql
npm i bluebird
注：可以用node /home/shxy/link2data/server/index.js测试，根据报错安装缺少的包即可。
# 运行
pm2 start /home/shxy/link2data/server/index.js
```
### vue
```
# 文件位置
/home/shxy/link2data/dist
# 运行
在server中设定 root目录、端口号
以及重定向配置：
        location / {
                try_files $uri $uri/ /index.html;
        }
```
## 代码结构

### node server
```
# 本应用使用express框架，/server/为应用的根目录，以下用/代替。
# /目录
/index.js为应用入口。
/sql_map.js提供应用涉及到的sql语句。
/db.js初始化了所有MySQL数据库的连接。

# /api目录
/api/list.js提供了本应用目前（2018/4/12）所有的接口(主要是数据库数据的获取)。
/api/auth.js提供了用户登陆接口，被弃用。
/api/create.js 将会提供有关数据库、表的创建接口，待完成。
# /functions目录
cors.js记录了server允许跨域访问的源列表，但是本应用在index.js直接设置允许所有源，这个列表并没有被使用，暂时保留。
dataformat.js提供返回数据的结构。
# /service目录
list_query.js是/api/list.js的接口功能的具体实现。
```
### vue
```
# static目录为全局的静态文件，在index.html中引用。
# src目录为vue应用的主体代码，以下用/代替。
# /目录
main.js为应用入口，创建了根vue实例。
# /api目录
提供面向后端api的ajax请求（Axio库）
# /assets目录
# /components目录
vue实例，对应前端各个页面或布局
# /lib目录
vueHelper.js 提供获取数据的功能方法
# /router目录
vue的路由设置（使用vue-router）
# /vuex目录
store.js存储了vue在全局所使用的数据。（使用Vuex）
```
-----以下是vue代码的构建，供需要改代码重新构建使用------
# link2database

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
