cc.Class({
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
        _logicHolder:null,//拥有者
        _targetNum:1,//目标数
        _targetSelf:false,
        _id:0,

    },

    ctor:function(){

    },

    init:function(id,level){

    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});


global.GSkillFactory = {
    createSkill:function(id,level){
        
    },


};