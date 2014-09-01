/**
 * Created by liuhujun on 14-8-4.
 */

var kNoodle1Tag = 1;
var kNoodle2Tag = 2;
var kMianTag = 3;
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new GameLayer());
    }
});

var GameLayer = cc.Layer.extend({
    spriteNoodle1 : null,
    spriteNoodle2 : null,
    timeLabel : null,
    time : 0.0,
    count : 0,
    countDownLabel : null,
    countDown : null,
    mian : null,

    ctor : function () {
        this._super();
        this.init();
    },
    init : function(){
        var winsize = cc.director.getWinSize();
        //var fontdef = cc.FontDefinition.create();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

        this.count = 0;
        this.timeLabel = cc.LabelTTF.create("0.0秒", "幼圆", 42);
        this.timeLabel.setColor([255,255,255]);
        this.timeLabel.setPosition(100, 50);
        this.addChild(this.timeLabel,4);

        //设置游戏背景。ps.背景碗下部要盖住面条，模拟面条从碗里出来。
        var gameBgBottom= cc.Sprite.create(res.Gamebg_bottom_png);
        gameBgBottom.setAnchorPoint(0.5, 0.5);
        gameBgBottom.setPosition(centerPos);
        this.addChild(gameBgBottom, 3);

        this.mian = cc.Sprite.create(res.Mian_png);
        this.mian.setAnchorPoint(0.5, 0.5);
        this.mian.setPosition(centerPos);
        this.addChild(this.mian, 2, kMianTag);

        //设置人物下脸动画,3帧
        var ta = cc.Animation.create();
        ta.addSpriteFrameWithFile(res.OpenMouthBottom_png);
        ta.addSpriteFrameWithFile(res.HalfMouthBottom_png);
        ta.addSpriteFrameWithFile(res.ShutMouthBottom_png);
        ta.setDelayPerUnit(5.8/14);
        ta.setRestoreOriginalFrame(true);
        var bottomAnimate = cc.RepeatForever.create(cc.Animate.create(ta));
        var bottomSprite = cc.Sprite.create(res.OpenMouthBottom_png);
        //bottomSprite.setAnchorPoint(0.5, 0.5);
        bottomSprite.setPosition(centerPos);
        this.addChild(bottomSprite, 0);
        bottomSprite.runAction(bottomAnimate);

        //设置人物上脸动画,3帧
        var sa = cc.Animation.create();
        sa.addSpriteFrameWithFile(res.OpenMouthTop_png);
        sa.addSpriteFrameWithFile(res.HalfMouthTop_png);
        sa.addSpriteFrameWithFile(res.ShutMouthTop_png);
        sa.setDelayPerUnit(5.8 / 14);
        sa.setRestoreOriginalFrame(true);
        var topAnimate = cc.RepeatForever.create(cc.Animate.create(sa));
        var topSprite = cc.Sprite.create(res.OpenMouthTop_png);
        topSprite.setAnchorPoint(0.5, 0.5);
        topSprite.setPosition(centerPos);
        this.addChild(topSprite, 2);
        topSprite.runAction(topAnimate);
        //面条
        this.spriteNoodle1 = cc.Sprite.create(res.Noodle_png);
        this.spriteNoodle1.setPosition(winsize.width / 2, 0);
        this.addChild(this.spriteNoodle1, 1, kNoodle1Tag);

        this.spriteNoodle2 = cc.Sprite.create(res.Noodle_png);
        this.spriteNoodle2.setPosition(winsize.width / 2, -this.spriteNoodle1.height / 2 - this.spriteNoodle2.height / 2);
        this.addChild(this.spriteNoodle2, 1, kNoodle2Tag);

        //this.countDownLabel = cc.LabelTTF.create("0.0秒", "幼圆", 80);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        this.scheduleUpdate();
    },

    onTouchBegan:function(touch, event) {
        cc.log("onTouchBegan");
        var target = event.getCurrentTarget();    // 获取事件所绑定的 target
        // 获取当前点击点所在相对按钮的位置坐标
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {        // 点击范围判断检测
            target.opacity = 180;
            return true;
        }
        return false;
    },

    onTouchMoved:function(touch, event) {
        var targetNoodle1 = event.getCurrentTarget().getChildByTag(kNoodle1Tag);
        var targetNoodle2 = event.getCurrentTarget().getChildByTag(kNoodle2Tag);
        var targetMian = event.getCurrentTarget().getChildByTag(kMianTag);
        var delta = touch.getDelta();
        if(delta.y > 0) {
            targetNoodle1.y += delta.y;
            targetNoodle2.y += delta.y;
            targetMian.y -= delta.y * 0.004;
        }
    },

    onTouchEnded:function(touch, event) {

    },

    update:function (dt) {
        //if(this.spriteNoodle1.y)
        //cc.log(this.spriteNoodle1.getPositionY());
        var winsize = cc.director.getWinSize();
        this.time += dt;
        this.timeLabel.setString(this.time.toFixed(2)+"秒");
        //cc.log(this.time.toString());
        //cc.log(this.count.toString());
        if(this.spriteNoodle1.getPositionY() >= this.spriteNoodle1.height)
        {

            this.spriteNoodle1.setPosition(winsize.width / 2, this.spriteNoodle2.getPositionY() - this.spriteNoodle2.height);
            this.count++;
            cc.log(this.count.toString());

        }
        if(this.spriteNoodle2.getPositionY() >= this.spriteNoodle2.height)
        {

            this.spriteNoodle2.setPosition(winsize.width / 2, this.spriteNoodle1.getPositionY() - this.spriteNoodle1.height);
            this.count++;
            cc.log(this.count.toString());
        }

        if(this.count > 13)
            this.spriteNoodle2.visible = false;
        if(this.count >= 15)
        {

            cc.log("GameOver");
            this.count = 0;
            cc.director.pause();
            this.parent.addChild(new GameOverLayer(this.time.toFixed(2)));
//
        }
    }
});


