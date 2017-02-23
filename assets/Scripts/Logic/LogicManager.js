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
        require("LogicHero");
        for(var i=0;i<3;i++){
            var player = new global.LogicHero();
            var enemy = new global.LogicHero();

            this._playerList.push(player);
            this._enemeyList.push(enemy);
        }
        var cur = this;
        this.scheduleOnce(function(){
            cc.log("begin game");
            cur.fightReset();
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
        this._playerList[0].init(global.core.clone(attri))._teamType = 0;
        this._playerList[0].setName("Player");

        attri.speed = 50+cc.rand()%100;
        this._enemeyList[0].init(global.core.clone(attri))._teamType = 1;
        this._enemeyList[0].setName("enemy");

        this.beginNewFight();

    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    beginNewFight:function(){
        this._isFightEnd = false;
        this._allHeroList.splice(0,core.length(this._allHeroList));
        this.roundStart();
    },

    roundStart:function(){
        this._RoundNum++;
        this._ActionIndex = 0;
        this._allHeroList = new Array();
        var cur = this;
        cc.log("player="+this._playerList.length+"enmey="+this._playerList.length);
        global.core.foreach(this._playerList,function(index,logicHero){
            if(logicHero._isAlive){
                cur._allHeroList.push(logicHero);
            }
                
        });
        global.core.foreach(this._enemeyList,function(index,logicHero){
            if(logicHero._isAlive){
                cur._allHeroList.push(logicHero);
            }
        });

        this._allHeroList.sort(function(a,b){
            return a._runningAttribute.speed - b._runningAttribute.speed;
        });

        this.beginLogicDelay(1);
    },

    //延时开始一个战斗
    beginLogicDelay:function(delayTime){
        var cur = this;
        this.scheduleOnce(function(){
            cur.doGameLogic();
        },delayTime);
    },

    //一个战斗动作开始
    doGameLogic:function(){
        if(this._isFightEnd){
            return;
        }
        //TODO 更新游戏状态
        this._actionHero = this.getNextActionHero();
        //没有活动的英雄了。则本回合结束，进行下一个回合
        if(this._actionHero==null){
            this.roundStart();
        }else{
            if(this._isSkipCurFight){
                this._isSkipCurFight = false;
                this.delayBeginNextFight(1);
            }else{
                this._actionHero.hurtCount(this.getRivalList(this._actionHero));
            }
        }
    },


    delayBeginNextFight:function(delayTime){
        var cur = this;
        this.scheduleOnce(function(){
            cur.cbOneFightActionEnd();
        },delayTime);
    },

    //一个攻击动作结束
    cbOneFightActionEnd:function(){
        this.checkOrBeginFight();
    },
    
    //检查战斗是否结束，不结束就继续战斗
    checkOrBeginFight:function(){
        //1胜利，-1失败，0未结束
        var result = -1;
        for (var i = 0, length = this._playerList.length; i < length; ++i)
        {
            var ret = this._playerList[i];
            if(ret._isAlive){
                result = 1;
                break;
            }
        }

        if(result>0){
            for (var i = 0, length = this._enemeyList.length; i < length; ++i){
                var ret = this._enemeyList[i];
                if(ret._isAlive){
                    result = 0;
                    break;
                }
            }
        }

        //本次战斗结束
        if(result==-1){
            //TODO
            cc.log("战斗失败");
        }else if(result==1){
            cc.log("战斗胜利");
        }else{
            this.beginLogicDelay(1);
        }

    },

    getRivalList:function(hero){
        if(hero._teamType==0){
            return this._enemeyList;
        }else{
            return this._playerList;
        }
    },
    
    getNextActionHero:function(){
        var hero = null;

        var isContinu = true;

        while(isContinu){
            if(this._ActionIndex>=this._allHeroList.length){
                isContinu = false;
                break;
            }else{
                hero = this._allHeroList[this._ActionIndex];
                this._ActionIndex = this._ActionIndex+1;
                if(hero._isAlive){
                    isContinu = false;
                    break;
                }
            }
        }
        return hero;
    }
    
});
