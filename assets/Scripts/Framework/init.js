global.Framework = {}
require("./Core/Base.js")
require("./Core/Md5.js")
require("./Core/JsExtention.js")
require("./Page/PageManager.js");
require('../Logic/HeroAttriFactory');

global.Framework.Game = cc.Class({
    extends: cc.Component,
    
    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

    },

    // use this for initialization
    onLoad: function () {
        cc.log('init.js onload');

        this.testFunc();
        global.DataConfig.loadHeroConfig();
        var LogicManager = require('../Logic/LogicManager');
        this.addComponent(LogicManager);
    },

    testFunc:function(){
        var objectList = new Array();
        function shenfen(sf){
            this.sf=sf;
        }

        function Persion(name,age){
            this.name=name;
            this.age=age;
            this.sf = new shenfen(age);
            }
        objectList.push(new Persion('jack',20));
        objectList.push(new Persion('tony',25));
        objectList.push(new Persion('stone',26));
        objectList.push(new Persion('mandy',23));
        //按年龄从小到大排序
        objectList.sort(function(a,b){
            cc.log("a instanteof Persion ="+a instanceof Persion);
            return a.sf.sf-b.sf.sf});
        for(var i=0;i<objectList.length;i++){
            cc.log('<br />age:'+objectList[i].age+' name:'+objectList[i].name);
            }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
