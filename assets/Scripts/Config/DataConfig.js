global.DataConfig = (function(){
    var instance;
    function Construct(){
        cc.log("DataConfig instance");

        this.loadHeroConfig = function(){
            cc.log("DataConfig loadHeroConfig");
            var self = this;
            cc.loader.loadRes("config/HeroConfig",function(err,result){
                self.HeroConfig = result;
                cc.log("Load HeroConfig result = "+result);
            });
        };
    }
    instance = new Construct();
    return instance;



    

})();