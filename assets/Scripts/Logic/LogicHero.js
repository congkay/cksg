global.LogicHero = cc.Class({
    name:"LogicHero",
    _name:"",
    setName:function(str){
        this._name = str;
    },
    getName:function(){
        return this._name;
    },
    ctor:function(){
        this._controlComond = null;
        this._teamType = 0;
        this._isActive=false;
        this._isAlive=false;
        this._troopIndex=0;
        this._baseAttribute = new global.DHeroAttri();
        this._runningAttribute = new global.DHeroAttri();
    },


    getSpeed:function(){
        return this._runningAttribute.speed;
    },

    clearData:function(){
        cc.log("clearData");
        this._baseAttribute = new global.DHeroAttri();
        this._runningAttribute = new global.DHeroAttri();
        this._teamType = 0;
        this._isActive = false;
        this._controlComond.node.active   = false;
    },

    init:function(attri){
        var attrStr = JSON.stringify(attri);
        cc.log("init hero with attr:"+attrStr);
        this._baseAttribute = attri;
        this._runningAttribute = attri;
        this._isActive = true;
        this._isAlive = true;
        this._controlComond.node.active   = true;
        return this;
    },

    setNode:function(playerNode){
        this._controlComond = playerNode.getComponent("FightHero");
        this._controlComond.bindController(this);
    },

    //伤害统计，deflist攻击的敌人列表
    hurtCount:function(defList){
        var isHited = true;
        var cur = this;
        if(isHited&&global.core.isArray(defList)){
            global.core.foreach(defList,function(index,hero){
                if(hero._isAlive){
                    hero.receiveDamage(cur._runningAttribute.att,false);
                }
            });
            
            this.doAttact();
        }
    },

    //伤害数量，是否无视防御
    receiveDamage:function(damageNum,ignoreDef){
        var hurtNum = damageNum;
        if(!ignoreDef){
            hurtNum = damageNum-this._runningAttribute.def;
        }

        this.jianxue(hurtNum);
        return hurtNum;
    },

    jianxue:function(num){
        this._baseAttribute.hp-=num;
        cc.log(this.getName()+"---->hurted :"+num+",leftblood="+this._baseAttribute.hp);
        if(this._baseAttribute.hp<=0){
            this._baseAttribute.hp = 0;
            this._isAlive = false;
        }
        this._controlComond.freshHeroAttr(this._baseAttribute);
        this._controlComond.defAction();
    },
    //执行攻击
    doAttact:function(){
        // cc.log('doAttact');
        // this.scheduleOnce(function(){
            // this.attactActionEndCB();
        // },1.5);
        this._controlComond.attactAction();
    },

    //攻击完成
    attactEnd:function(){
        cc.log("attactEnd");
        global.GLogicManager.cbOneFActionEnd();
    },

    //攻击动作完成之后回调
    attactActionEndCB:function(){
        this.attactEnd();
    },

    //执行防御动作
    doDefend:function(skill){
        this._controlComond.defAction();
    },
    //执行防御动作完成
    defendActionEnd:function(){

    },
    fightEnd:function(){
        this._isActive = false;
    },
});
