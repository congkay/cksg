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
        //活动的角色
        _actionHero:null,

        _ActionIndex:0,

        _RoundNum:0,

        _isFightEnd:false,

        _isSkipCurFight:false,

    },

    // use this for initialization
    onLoad: function () {
        this._playerList = new Array();
        this._enemeyList = new Array();
        this._allHeroList = new Array();
        global.GLogicManager = this;
        var LogicHero = require("LogicHero");
        for(var i=0;i<3;i++){
            var player = new LogicHero();
            var enemy = new LogicHero();
            this._playerList.push(player);
            this._enemeyList.push(enemy);
        }
        this.scheduleOnce(function(){
            cc.log("begin game");
            this.fightReset();
        },2);
    },

    fightReset:function(){
        var attri = global.GHeroAttriFactory.createNullHeroAttri();
        attri.hp = 100;
        attri.mp = 100;
        attri.att = 4;
        attri.def = 1;
        

        global.core.foreach(this._playerList,function(index,logicHero)
        {
            logicHero.clearData();
        });
        global.core.foreach(this._enemeyList ,function(index,logicHero)
        {
            logicHero.clearData();
        });

        attri.speed = 100+cc.rand()%100;
        this._playerList[0].init(global.clone(attri))._teamType = 0;

        attri.speed = 50+cc.rand()%100;
        this._enemeyList[0].init(global.clone(attri))._teamType = 1;

        beginNewFight();

    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    beginNewFight:function(){
        _isFightEnd = false;
        _allHeroList.splice(0,core.length(_allHeroList));

    },

    roundStart:function(){
        _RoundNum++;
        _ActionIndex = 0;
        _allHeroList.splice(0,core.length(_allHeroList));

        global.core.foreach(this._playerList,function(logicHero){
            if(this._allHeroList.indexOf(logicHero)==-1){
                this._allHeroList.push(logicHero);
            }
        });
        global.core.foreach(this._enemeyList,function(logicHero){
            if(this._allHeroList.indexOf(logicHero)==-1){
                this._allHeroList.push(logicHero);
            }
        });

        _allHeroList.sort(function(a,b){
            return a._runningAttribute.speed - b._runningAttribute.speed;
        });

        this.beginLogicDelay(1);
    },

    //延时开始一个战斗
    beginLogicDelay:function(delayTime){
        this.scheduleOnce(function(){
            doGameLogic();
        },delayTime);
    },

    //一个战斗动作开始
    doGameLogic:function(){
        if(_isFightEnd){
            return;
        }
        //TODO 更新游戏状态

        this._actionHero = this.GetNextActionHero();
        //没有活动的英雄了。则本回合结束，进行下一个回合
        if(this._actionHero==null){
            roundStart();
        }else{
            if(this._isSkipCurFight){
                this._isSkipCurFight = false;
                delayBeginNextFight(1);
            }else{
                this._actionHero.hurtCount(this.getRivalList());
            }
        }
    },


    delayBeginNextFight:function(delayTime){
        this.scheduleOnce(function(){
            this.cbOneFightActionEnd();
        },delayTime);
    },

    //一个攻击动作结束
    cbOneFightActionEnd:function(){

    },
    
    //检查战斗是否结束，不结束就继续战斗
    checkAndBeginFight:function(){
        var result = 0;

        //本次战斗结束
        if(result==0){
            //TODO
        }else{
            this.beginLogicDelay();
        }

    },

    getRivalList:function(hero){
        if(hero._teamType==0){
            return this._enemeyList;
        }else{
            return this._playerList;
        }
    }
    
});
