var DataConfig = {};
DataConfig.loadHeroConfig = function(){
    cc.log("DataConfig loadHeroConfig");
    var self = this;
    this.isLoadFinish = false;
    cc.loader.loadRes("config/HeroConfig",function(err,result){
        self.HeroConfig = JSON.parse(result);
        self.isLoadFinish = true
        cc.log("Load HeroConfig result = "+result);
    });
};
DataConfig.getHeroAttrByID = function(id){
        var result = {};
        var attrs = this.HeroConfig;
        global.core.foreach(this.HeroConfig,function(index,data){
            if(data[1]==id){
                for(var i=0;i<data.length;i++){
                    result[attrs[0][i]] = data[i];
                }
            }
        });
    cc.log("getHeroAttrByID result ="+result)
    return result;
};

global.DataConfig = DataConfig;
