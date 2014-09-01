/**
 * Created by liuhujun on 14-8-5.
 */
var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new MenuLayer());
    }
});

var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        var menuBg = cc.Sprite.create(res.Menubg_png);
        menuBg.setPosition(centerPos);
        this.addChild(menuBg);

        var startGamebtn = cc.MenuItemImage.create(res.StartGamebtn_png,res.StartGamebtn_png, this.onStart, this);
        var menu = cc.Menu.create(startGamebtn);
        menu.setPosition(winsize.width / 2, winsize.height / 7);
        this.addChild(menu);
        return true;
    },

    onStart : function()
    {
        //cc.director.pause();
        cc.director.runScene(new CountScene());
    }
});


