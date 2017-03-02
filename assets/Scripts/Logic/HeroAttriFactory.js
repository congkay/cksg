//控制英雄属性
global.DHeroAttri = cc.Class({
        name:"DHeroAttri",
        maxHp:0,
        hp:0,
        maxMp:0,
        mp:0,
        att:0,
        def:0,
        speed:0,
    }); 

global.GHeroAttriFactory = {
      
    init:function(){
        

    },

    createNullHeroAttri:function(){
        return new global.DHeroAttri();
    },

    createHeroAttri:function(jsonStr){
        return JSON.parse(jsonStr);
    },
}
