'use strict!'
// loader-utils作为工具类引入(作为webpack依赖，所以在安装webpack时候就带上了)
const loaderUtils = require('loader-utils')
const marked = require("marked");
const fs = require('fs')
const path = require('path')
const log = console.log

// loader调用的时候，会将源数据和sourcemap作为参数传入函数
module.exports = function(source, inputSourceMap) {
    let code = source
    const map = inputSourceMap
    // 获取options的方法
    // loaderUtils.getOptions 可以获取到设置loader时候设置的options
    // 当然loaderUtils还有很多其他有用的方法，详情可以看 https://github.com/webpack/loader-utils
    const loaderOptions = loaderUtils.getOptions(this) || {};



    //  替换px
    // const regex = /(\d+?)px/g
    // code = code.replace(regex, function(match, p1) {
    //   return p1/10 + 'vw'
    // })


    // 这是同步写法
    // loader需要将自己的值传给下一个loader，并且，loader不免会有异步操作
    // 因此需要回调来证明自己已经处理结束了
    // this.callback(null, code, map)


    // 这是异步写法
    // var callback = this.async();
    // setTimeout(()=>{
    //     callback(null, code,map)
    // },1000)


    // 这是将md转为react component的例子
    if (this.context.indexOf('/docs') !== -1) {
        // console.log(this.context)
        // md 标题 作者 时间信息
        let mdInfo = getMdInfo(code)



        // 获取md的详情模板 pages/Detail组件
        const templatePath = path.resolve(this.options.context,'src/pages/Detail/Detail.js')
        let template = fs.readFileSync(templatePath,'utf-8')



        // img标签加闭合避免报错
        this.cacheable();
        var renderer = new marked.Renderer();
        renderer.image = function (href, title, alt) {
          var out = '';
          out += '<img src="' + href + '" alt="' + alt + '"/>';
          return out;
        };
        marked.setOptions({...{
          gfm: true,
          renderer: renderer
        }});



        // 删除code中的info信息
        let tem = code.slice(code.indexOf('^^_^^'),code.lastIndexOf('^^_^^')+5)
        code = code.replace(tem,'')




        // 替换md为react组件
        template = template.replace(/\$\{md\}/g,`${JSON.stringify(mdInfo || {})}`)
        template = template.replace(/\$\{content\}/g,`${marked(code)}`)
        code = template


    }




    //
    // // 处理category组件
    // if(code.indexOf('i am category') !== -1) {
    //     // this.options.context 项目地址
    //     // this.context 文件所在目录
    //     // this.resourcePath 文件路径
    //     const docsPath = path.resolve(this.options.context,'src/docs')
    //     let arr = fs.readdirSync(docsPath).filter(item=>{
    //         return item.slice(0,1) !== '.'
    //     })
    //     let str = ''
    //     arr.map(item=>{
    //         // console.log(docsPath+item)
    //         let categoryPath = docsPath+'/'+item
    //         let str2 = ''
    //         fs.readdirSync(categoryPath).map(item2=>{
    //             let fileName = categoryPath+'/'+item2
    //             let content = fs.readFileSync(fileName,'utf-8')
    //             let mdInfo = getMdInfo(content)
    //             // 增加判断用来实现分类
    //             str2 += `{
    //                 (!name||'${item}'===name)&&
    //                     <Link to='/${item}/${item2.slice(0,-3)}'>
    //                         <div>${mdInfo[0]},${mdInfo[1]},${mdInfo[2]}</div>
    //                     </Link>
    //                 }`
    //         })
    //         str += str2
    //     })
    //     code = code.replace('category-list',str)
    // }




    // 处理根组件的路由
    if(code.indexOf('i am root component') !== -1) {
        const docsPath = path.resolve(this.options.context,'docs')
        let arr = fs.readdirSync(docsPath).filter(item=>{
            return item.slice(0,1) !== '.'
        })
        let importStr = ''
        let routeStr = ''
        arr.map(item=>{
            // console.log(docsPath+item)
            let categoryPath = docsPath+'/'+item
            let importStr2 = ''
            let routeStr2 = ''
            fs.readdirSync(categoryPath).map((item2,index)=>{
                let fileName = categoryPath+'/'+item2
                importStr2 += `import ${item}${item2.slice(0,-3)} from 'bundle-loader?lazy&!@docs/${item}/${item2}';
                const ${item}C = Bundle(${item}${item2.slice(0,-3)})
                `
                routeStr2 += `<Route path="/${item}/${item2.slice(0,-3)}" component={${item}C} />`
            })
            importStr += importStr2
            routeStr += routeStr2
        })

        code = code.replace('import-list',importStr)
        code = code.replace('Route-list',routeStr)
    }






    // 处理redux store
    if(code.indexOf('i am redux store') !== -1) {
        const docsPath = path.resolve(this.options.context,'docs')
        // 存放category的数组
        let categoryArr = fs.readdirSync(docsPath).filter(item=>{
            return item.slice(0,1) !== '.'
        })

        // 存放所有的文章
        let article = []

        categoryArr.map(item=>{
            let categoryPath = docsPath+'/'+item
            fs.readdirSync(categoryPath).map((item2)=>{
                // md名称
                let mdName = item2
                // md路径
                let mdPath = categoryPath+'/'+item2
                // md的内容
                let md = fs.readFileSync(mdPath,'utf-8')
                // md信息：标题，作者，时间
                let mdInfo = getMdInfo(md)
                // md所属分类
                let category = item

                var renderer = new marked.Renderer();
                renderer.image = function (href, title, alt) {
                  var out = '';
                  out += '<img src="' + href + '" alt="' + alt + '"/>';
                  return out;
                };
                marked.setOptions({...{
                  gfm: true,
                  renderer: renderer
                }});

                // 将md转成html
                md = md.replace('i am a markdown component', '')
                let tem = md.slice(md.indexOf('^^_^^'),md.lastIndexOf('^^_^^')+5)
                md = md.replace(tem,'')
                md = marked(md)

                article.push({
                    mdName,
                    ...mdInfo,
                    category,
                })
            })
        })

        code = code.replace('category replace me',`["${categoryArr.join('","')}"]`)
        code = code.replace('article replace me',JSON.stringify(article))
    }





    // 关于我的 组件
    if (code.indexOf('i am about component') !== -1) {
        let readmePath = path.resolve(this.options.context,'README.md')
        // md的内容
        let readme = fs.readFileSync(readmePath,'utf-8')

        // img标签加闭合避免报错
        this.cacheable();
        var renderer = new marked.Renderer();
        renderer.image = function (href, title, alt) {
          var out = '';
          out += '<img src="' + href + '" alt="' + alt + '"/>';
          return out;
        };
        marked.setOptions({
          gfm: true,
          renderer: renderer,
          highlight: function (readme) {
            return require('highlight.js').highlightAuto(readme).value;
          }
        });

        let md = marked(readme).replace(/\<span class=/g,'<span className=')
        code = code.replace(/\$\{content\}/g,`${md}`)
    }



    return code
    // this.callback(null, code, map)
}

// 获取md文本中的标题、作者、时间。
function getMdInfo(content){
    let mdInfo = content.slice(content.indexOf('^^_^^')+5,content.lastIndexOf('^^_^^'))
    let mdInfoObj = eval(`({${mdInfo}})`)


    // let mdInfoArr = content.slice(content.indexOf('^^_^^')+5,content.lastIndexOf('^^_^^')).split('\n')
    // let mdInfoObj = {}
    // mdInfoArr.shift()
    // mdInfoArr.pop()
    // mdInfoArr.map(item=>{
    //     let item2 = item.split(':')
    //     mdInfoObj[item2[0]] = item2[1]
    // })

    return mdInfoObj
}
