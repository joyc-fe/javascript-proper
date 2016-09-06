/**
 * Created by yuchao on 16/9/2.
 */

var bindingMark = 'data-element-binding'
function Element (classa, initData) {
    var self     = this,
        el          = self.el = document.getElementsByClassName(classa),//多个input改为class
        bindings = {} //虚拟dom对象  这里不能算dom tree, vue的虚拟dom 只能算treenode集合吧
        data = self.data = {}

    /**
     * 替换掉 v-model,?
     * 重新赋值相当于get set
     *
     * replace 第二个参数是function(argument1,argument2,....,arguments[n-1],arguments[n])
     * 第1个是匹配匹配项；
     * 第2个是第一个捕获组的匹配项；
     * 第3个是第二个捕获组的匹配项；
     * n-1 是位置
     * n 原始字符串
     *
     * */
    for (var i = 0; i < el.length; i++) {
        content  = el[i].outerHTML.replace(/v-model=\"(.*)\"/g, markToken); // get
        el[i].outerHTML = content //set
    }
    /**
     * 对虚拟对象进行遍历处理
     * */
    for (var variable in bindings) {
        bind(variable);
    }
    /**
     * 设置对象数据，
     *
     * initData 是要从外部传进来的
     *
     * 绑定对象key要和model.key一致
     *
     * data
     *
     * */
    if (initData) {
        for (var variable in initData) {
            data[variable] = initData[variable]
        }
    }
    /**
     * bindings？ 建立虚拟dom对象，此时还是空的
     * */
    function markToken (match, variable) {
        bindings[variable] = {}
        return  bindingMark + '="' + variable +'"'
    }
    /**
     *bindings[variable].els 给虚拟dom设置对象
     * */
    function bind (variable) {
        //设置虚拟dom的元素
        bindings[variable].els = document.querySelectorAll('[' + bindingMark + '="' + variable + '"]')//document获取binding元素
        ;

        [].forEach.call(bindings[variable].els, function (e) {
            //删除data-element-binding属性
            e.removeAttribute(bindingMark);

            e.addEventListener("input",function(){
                data[variable] = e.value
                console.log(e.value);
            });

        });




        // 1.属性所在对象, 2.属性名称, 3.描述符对象
        Object.defineProperty(data, variable, {
            set: function (newVal) {

                [].forEach.call(bindings[variable].els, function (e) {
                    // 为对象赋值  这是有value属性的input
                    bindings[variable].value = e.value = newVal; //=>textContent改为input的value
                })
            },
            get: function () {
                return bindings[variable].value;
            }
        })
    }
}





function Element2 (id, initData) {
    var self     = this,
        el          = self.el = document.getElementById(id)
    bindings = {} //内部暂存绑定数据及dom
    data      = self.data = {} //存储bingding数据并实现监控
    content  = el.innerHTML.replace(/\{\{(.*)\}\}/g, markToken)
    el.innerHTML = content

    for (var variable in bindings) {
        bind(variable); //将每个数据的名称比如'msg'绑定到data
    }
    if (initData) {
        for (var variable in initData) {
            data[variable] = initData[variable]
        }
    }
    function markToken (match, variable) {
        bindings[variable] = {}; //bindings里存储了数据来源的字段比如bindings['msg']
        return '<span ' + bindingMark + '="' + variable +'"></span>'; //内填一个span变为只改它的元素
    }
    function bind (variable) {
        bindings[variable].els = el.querySelectorAll('[' + bindingMark + '="' + variable + '"]')
            //bindings里再存储msg绑定的元素
        ;[].forEach.call(bindings[variable].els, function (e) {
            //删除data-element-binding属性
            e.removeAttribute(bindingMark);
        })
        Object.defineProperty(data, variable, { //es5观察属性

            set: function (newVal) {
                // 1.属性所在对象,2.属性名称,3.描述符对象
                [].forEach.call(bindings[variable].els, function (e) {
                    bindings[variable].value = e.textContent = newVal; //=>这里才是实现的绑定,更新数据到dom并更新内部暂存数据
                })
            },
            get: function () {
                return bindings[variable].value ; //取数据仅仅是内部暂存的数据
            }
        })
    }
}

var app = new Element('test', {
    msg: 'hello',
    hey:'aaa'
})

new Element2('div2', {
    msg: data.msg,
    hey:data.hey
})


