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
        icon: cc.Sprite,
        xueTiao:cc.ProgressBar,
        xueLiang:cc.Label,
        lanLiang:cc.Label,
        lanTiao:cc.ProgressBar,
        roleNmae:cc.Label,

        // pos:cc.Vec2,
        // pos1:cc.p
    },

    xiaoming:cc.Class({
        properties:{
            name:"xiaoming",
            age:10,
            class:2,
        }
    }),


    // use this for initialization
    onLoad: function () {
        // var one = new this.xiaoming();
        // var xiaomingStr = JSON.stringify(one);
        // cc.log(xiaomingStr);

        // var xiaomingObj = JSON.parse(xiaomingStr);

        // cc.log(xiaomingObj.name);

        
        // global.DataConfig.getHeroAttrByID(1);
        this._initPos = this.node.position;
        this.attActionTime = 0.1;
        this.defActionTime = 0.1;
        this.attMoveOff = 20;
        this.defMoveOff = 20;
    },

    //绑定控制器 
    bindController:function(control){
        this._holder = control;
        
    },


    attactAction:function(){
        this.node.position = this._initPos;
        this.node.stopAllActions();
        var movePos = cc.p(this.attMoveOff,0);
        if(this._holder._teamType==1){
            movePos = cc.p(-this.attMoveOff,0);
        }
        var moveTo = cc.moveBy(this.attActionTime,movePos);
        var moveBack = moveTo.reverse();
        this.node.runAction(cc.sequence(
            moveTo,
            moveBack
        ));
        this.scheduleOnce(function(){
            this.attactActionEnd();
        },1);
    },

    defAction:function(){
        this.node.position = this._initPos;
        this.node.stopAllActions();
        var movePos = cc.p(-this.defMoveOff,0);
        if(this._holder._teamType==1){
            movePos = cc.p(this.defMoveOff,0);
        }
        var moveTo = cc.moveBy(this.defActionTime,movePos);
        var moveBack = moveTo.reverse();
        this.node.runAction(cc.sequence(
            moveTo,
            moveBack
        ));

        this.scheduleOnce(function(){
            this.defActionEnd();
        },1);
    },

    

    attactActionEnd:function(){
        this._holder.attactActionEndCB();
    },

    defActionEnd:function(){
        this._holder.defendActionEnd();
    },


    freshHeroAttr:function(attr){
        this.xueLiang.string = attr.hp+"/"+attr.maxHp;
        this.lanLiang.string = attr.mp+"/"+attr.maxMp;
        this.xueTiao.progress = 1.0*attr.hp/attr.maxHp;
        this.lanTiao.progress = 1.0*attr.mp/attr.maxMp;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});


