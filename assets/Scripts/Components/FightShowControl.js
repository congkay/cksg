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
        // nodeList:{
        //     default:[],
        //     type:cc.Node
        // }
    },

    // use this for initialization
    onLoad: function () {
        this._playerArray = new Array();
        this._enemyArray = new Array();
        for(var i=0;i<3;i++){
            this._playerArray[i] = this.node.getChildByName("Player"+(i+1));
            this._enemyArray[i] = this.node.getChildByName("Enemy"+(i+1));
        }

        global.GLogicManager.loadControlView(this);
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
