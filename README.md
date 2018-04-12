
#link2data
##部署
###环境
```
#安装node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
nvm install v6.11.4
nvm use node
#安装pm2
npm install pm2 -gd
```
##server
```
#文件位置
/home/shxy/link2data/server
#包安装
npm i express
npm i cors
npm i moment
npm i jwt-simple
注：可以用node /home/shxy/link2data/server/index.js测试，根据报错安装缺少的包即可。
#运行
pm2 start /home/shxy/link2data/server/index.js
```
##vue
```
#文件位置
/home/shxy/link2data/dist
#运行
在server中设定 root目录、端口号
以及重定向配置：
        location / {
                try_files $uri $uri/ /index.html;
        }
```
#-----以下是vue代码的构建，供需要改代码重新构建使用------
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
