cc.Class({
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
        _controlPlayer:null,
        _baseAttribute:null,
        _runningAttribute:null,
        _teamType:0,
        _isActive:false,
    },

    clearData:function(){
        this._controlPlayer = null;
        this._baseAttribute = null;
        this._runningAttribute = null;
        this._teamType = 0;
        this._isActive = false;
    },

    init:function(attri){
        this._baseAttribute = attri;
        this._runningAttribute = global.clone(_baseAttribute);
        var attrStr = JSON.stringify(attri);
        this._isActive = true;
        cc.log("init hero with attr:"+attrStr);
        return this;
    },

    setPlayer:function(playerNode){
        this._controlPlayer = playerNode;
    },

    //伤害统计，deflist攻击的敌人列表
    hurtCount:function(defList){

    },

    //伤害数量，是否无视防御
    receiveDamage:function(damageNum,ignoreDef){

    },
    //执行攻击
    doAttact:function(){

    },

    //攻击完成
    attactEnd:function(){

    },

    //攻击动作完成之后回调
    attactActionEndCB:function(){

    },

    //执行防御动作
    doDefend:function(skill){

    },
    //执行防御动作完成
    defendEnd:function(){

    },
    
});
