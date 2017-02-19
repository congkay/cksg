cc.Class({
    extends: cc.Component,
    properties:{

    },

    init:function(){
        //控制英雄属性
        this.HeroAttribute = require("HeroAttribute");
    },

    createNullHeroAttri:function(){
        return new this.HeroAttribute();
    },

    createHeroAttri:function(jsonStr){
        return JSON.parse(jsonStr);
    }
});
