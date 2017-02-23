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
        var one = new this.xiaoming();
        var xiaomingStr = JSON.stringify(one);
        cc.log(xiaomingStr);

        var xiaomingObj = JSON.parse(xiaomingStr);

        cc.log(xiaomingObj.name);
        


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});


