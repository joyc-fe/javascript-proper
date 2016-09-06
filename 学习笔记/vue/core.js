/**
 * Created by yuchao on 16/9/2.
 */


//var name = getUrlParam("name");

/*通过正则获取url中的参数*/
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}


var syntaxParser = function(el)
{
    doucument.getElementById(el);
}


//applaciton
function base(conf)
{
    if(conf.el)
    {
        this["el"] =conf.el;
    }


    if(conf.data)
    {
        for(item in conf.data)
        {
            this[item] =conf.data[item];
        }
    }


    var allHanelType ={"functions":[]};



    for(item in conf.computed) {

        switch(typeof conf.computed[item]) {
            case "function":
                this[item] = conf.computed[item];
                allHanelType.functions.push(item);
                break;
            case "string":
            case "boolean":
            case "number":
                this[item] = conf.computed[item];
                break;

            case "object":
                console.log("递归处理");
                break;
            default:
                console.warn((typeof conf.computed[item])+"类型没有处理");
                break;
        }
    }




    for(index in allHanelType.functions) {
        var name = allHanelType.functions[index];
        this[name] = this[name].apply(this);
    }
}


//base
function Vue(conf){
    base.apply(this,[conf]);
    return this;
}



var gg = new Vue({
    el: '#app',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },

    computed: {

        fullName: function () {
            return this.firstName + ' ' + this.lastName +" "+this.address();
        },

        address: function () {
            return "北京市海淀区西北旺";
        },

        objectType: {"ddd":""},

        stingfiled:"vvvv",


    }
});



console.log(gg.fullName);
console.log(gg.stingfiled);


