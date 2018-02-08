# 个人简介

哈哈

## 项目概述

这是一个由webpack打包的react项目，配合配套的md2rc-loader可以实现本地编辑文档，浏览器热加载浏览，打包后直接发布到cdn上就可预览，可以用来实现文档管理、简化版的博客。

## 项目结构

```
├── src  // react组件放置位置
├── docs // 文档都要放在本文件夹下
│   ├── Node  // docs/下的二级文件夹名称将作为分类名使用
│   │   └── 20180203.js   // 文档名称最好按编写文档的时间定义。文档标题作者等信息需要在文档里定义。
│   ├── EcmaScript
│   └── 杂谈
├── dist // 打包后的资源
│   └── migrations
├── index.js
├── README.md
└── package.json
```

## 文档书写规范

```
^^_^^
title:'This is the first note about js',
author:'mcdyzg',
cover:'https://wp-themes.com/wp-content/themes/hestia/demo-preview-images/img/10.jpg',
desc:'hahahahahahahahahahahhahahahahahahahahahahahahahahahhahahahahahahahahahahahahahahahhahahahahahahahahahahahahahahahhahahahaha',
time:'2017-02-02 14:20:30',
^^_^^

## 标题

正文

...

```

1. 文档标题作者等信息必须写在^^_^^标签中

2. 如新增自定义属性，可以在src/pages/Detail/Detail.js里通过this.state.md接收到。

3. 正文写在第二个^^_^^后。



## 详解

1. 使用redux react react-router-dom 组件懒加载方案。

2. 组件在src下，可直接修改。

3. 文档要写在docs文件夹下，docs下的文件夹将作为目录使用。暂只支持docs/Node/name.js这种形式

4. code咱不支持正常解析。

5. 打包时请修改webpack.output.publicPath为cdn全路径。例如：`https://cdn.a.com/md/test/`

6. README.md中的内容将作为 #/readme里的内容显示。
