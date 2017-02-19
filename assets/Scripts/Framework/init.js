global.Framework = {}
require("./Core/Base.js")
require("./Core/Md5.js")
require("./Core/JsExtention.js")
require("./Page/PageManager.js");

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

        var LogicManager = require('../Logic/LogicManager');
        this.addComponent(LogicManager);

        var HeroAttriFactory = require('../Logic/HeroAttriFactory');
        global.GHeroAttriFactory = new HeroAttriFactory();
        global.GHeroAttriFactory.init();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
