/**
 * Created by liuhujun on 14-8-8.
 */

var CountScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new countDownLayer());
    }
});

var countDownLayer = cc.Layer.extend({

    countDownLabel : null,
    countDown : 0,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){
        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        this.countDownLabel = cc.LabelTTF.create("","幼圆",80);
        this.countDownLabel.setPosition(centerPos);
        this.countDownLabel.setColor(255,255,255);
        this.addChild(this.countDownLabel,1);

        var bgBottom= cc.Sprite.create(res.Gamebg_bottom_png);
        bgBottom.setAnchorPoint(0.5, 0.5);
        bgBottom.setPosition(centerPos);
        this.addChild(bgBottom);

        var bgMid = cc.Sprite.create(res.ShutMouthBottom_png);
        bgMid.setAnchorPoint(0.5, 0.5);
        bgMid.setPosition(centerPos);
        this.addChild(bgMid);

        var bgTop = cc.Sprite.create(res.ShutMouthTop_png);
        bgTop.setAnchorPoint(0.5, 0.5);
        bgTop.setPosition(centerPos);
        this.addChild(bgTop);

        this.scheduleUpdate();
    },

    update : function(dt){
        this.countDown += dt;
        switch(this.countDown.toFixed(0))
        {
            case "0":
                this.countDownLabel.setString("肆");
                break;
            case "1":
                this.countDownLabel.setString("叁");
                break;
            case "2":
                this.countDownLabel.setString("貳");
                break;
            case "3":
                this.countDownLabel.setString("壹");
                break;
            case "4":
                this.countDownLabel.setString("開吃");
                break;
            default:
                //cc.director.pause();
                cc.director.runScene(new GameScene());
        }
    }




})