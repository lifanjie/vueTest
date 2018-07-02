# vue-demo-cnodejs

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8050
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


--------初始模块管理--------------\
cnpm install\
--------安装sass支持插件----------\
cnpm install sass-loader -D\
cnpm install node-sass -D\
--------安装axios----------------\
cnpm install axios -D\
--------需要用的插件--------------\

-------插件修改------------------\
      let keyCode = window.event ? e.keyCode:e.which

      if (keyCode === 13) {
      // console.log(keyCode)
       // e.target.blur()
        this.$emit('on-enter', this.currentValue, e)
      }

