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
        cc.log("not a constructor");
        this._controlPlayer = null;
        this._teamType = 0;
        this._isActive=false;
        this._isAlive=false;
        this._troopIndex=0;
        this._baseAttribute = new global.DHeroAttri();
        this._runningAttribute = new global.DHeroAttri();
    },
    sayHello:function(){
      cc.log("Hello i am LogicHero");  
    },

    getSpeed:function(){
        return this._runningAttribute.speed;
    },

    clearData:function(){
        this._controlPlayer = null;
        this._baseAttribute = new global.DHeroAttri();
        this._runningAttribute = new global.DHeroAttri();
        this._teamType = 0;
        this._isActive = false;
    },

    init:function(attri){
        var attrStr = JSON.stringify(attri);
        cc.log("init hero with attr:"+attrStr);
        this._baseAttribute = attri;
        this._runningAttribute = attri;
        this._isActive = true;
        this._isAlive = true;
        
        return this;
    },

    setPlayer:function(playerNode){
        this._controlPlayer = playerNode;
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
    },

    jianxue:function(num){

        cc.log(this.getName()+"---->hurted :"+num+",leftblood="+this._baseAttribute.hp);
        this._baseAttribute.hp-=num;
        if(this._baseAttribute.hp<=0){
            this._baseAttribute.hp = 0;
            this._isAlive = false;
        }
    },
    //执行攻击
    doAttact:function(){
        // cc.log('doAttact');
        // this.scheduleOnce(function(){
            this.attactActionEndCB();
        // },1.5);
    },

    //攻击完成
    attactEnd:function(){
        global.GLogicManager.cbOneFightActionEnd();
    },

    //攻击动作完成之后回调
    attactActionEndCB:function(){
        this.attactEnd();
    },

    //执行防御动作
    doDefend:function(skill){

    },
    //执行防御动作完成
    defendEnd:function(){

    },
    
});
