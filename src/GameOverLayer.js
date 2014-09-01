/**
 * Created by liuhujun on 14-8-7.
 *
 */

var GameOverLayer = cc.LayerColor.extend({
    time: null,
    // wxData : {
         // "appId": null, // 服务号可以填写appId
         // "imgUrl" : null,
         // "link":null,
         // "desc":null,
         // "title":null
     // },

	ctor:function (time) {
        cc.log("ctor");
        this._super(cc.color(0, 0, 0, 180));
        this.init(time);

    },

    init:function (time) {
        this.time = time;
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        //cc.MenuItemFont.setFontSize(30);
        //var toFriendSprite = cc.Sprite.create(res.ToFriend_png);
        //var restartSprite = cc.Sprite.create(res.Restart_png);
        var shareBg = cc.Sprite.create(res.Sharebg_png);
        shareBg.setPosition(centerPos);
        this.addChild(shareBg, 0);
        var menuItemRestart = cc.MenuItemImage.create(
                              res.Restartbtn_png,res.Restartbtn_png,
                              this.onRestart, this);
        //menuItemRestart.setPosition(winSize.width/3, winSize.height/3);
        var menuItemToFriend = cc.MenuItemImage.create(
                               res.ToFriendbtn_png, res.ToFriendbtn_png,
                               this.onShareTo, this);
        //menuItemToFriend.setPosition(winSize.width*2/3, winSize.height/3);

        var menu = cc.Menu.create(menuItemToFriend,menuItemRestart);
        menu.alignItemsHorizontally(50);

        menu.setPosition(winSize.width/2, winSize.height/4);
        this.addChild(menu,1);
        var score = "你用" + time +"秒吃完了一碗面,\n";
        var floatTime = parseFloat(time);
        if(floatTime > 20.00)
            score += "你是在逗自己,再来一碗!";
        if(floatTime <= 20.00  & floatTime > 10.00)
            score += "这速度弱爆了,\n你还是再来一碗吧!";
        if(floatTime <= 10.00 & floatTime > 8.00)
            score += "简直神速度,\n想刷新记录就再来一碗?";
        if(floatTime <= 8.00 & floatTime > 6.00)
            score += "这速度碉堡了,\n赶快分享给好友你的成绩!";
        if(floatTime <= 6.00 & floatTime > 4.00)
            score += "我和我的小伙伴们都惊呆了,\n还能不能一起玩耍了!";

        var txtLabel = cc.LabelTTF.create(score, "幼圆", 34);
        txtLabel.setColor(255,255,255);
        txtLabel.setPosition(240, 600);
        this.addChild(txtLabel, 0);
    },

    onRestart:function (sender) {
        cc.log("onRestart");
        cc.director.resume();
        cc.director.runScene(new CountScene());
    },

    onShareTo : function(sender){
//        var sharel = new shareLayer();
//        layers.addChild(sharel,0,1);
        this.parent.addChild(new shareLayer(this.time));
    }
    });

var shareLayer = cc.LayerColor.extend({

    ctor:function (time) {
        cc.log("ctor");
        this._super(cc.color(0, 0, 0, 180));
        this.init(time);

    },

    init:function(time)
    {
        var shareBg = cc.Sprite.create(res.ToFriendbg_png);
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        shareBg.setPosition(centerPos);
        this.addChild(shareBg);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchEnded:function(t, event){
                event.getCurrentTarget().removeFromParent();
            }
        }, this);

        WeixinApi.ready(function(Api) {

            // 微信分享的数据
            var wxData = {
                "appId": "", // 服务号可以填写appId
                "imgUrl" : 'http://glgame.wicp.net:8800/eatNoodlee/res/gameicon.png',
                "link" : 'http://glgame.wicp.net:8800/eatNoodlee',
                "desc" : "",
                "title" : "狂吃拉面！！"
            };

            // 分享的回调
            var wxCallbacks = {
                // 分享操作开始之前
                ready : function() {
                    // 你可以在这里对分享的数据进行重组
                    //alert("准备分享");
                    var score = "你用" + time +"秒吃完了一碗面,\n";
                    var floatTime = parseFloat(time);
                    if(floatTime > 20.00)
                        score += "你是在逗自己,再来一碗!";
                    if(floatTime <= 20.00  & floatTime > 10.00)
                        score += "这速度弱爆了,\n你还是再来一碗吧!";
                    if(floatTime <= 10.00 & floatTime > 8.00)
                        score += "简直神速度,\n想刷新记录就再来一碗?";
                    if(floatTime <= 8.00 & floatTime > 6.00)
                        score += "这速度碉堡了,\n赶快分享给好友你的成绩!";
                    if(floatTime <= 6.00 & floatTime > 4.00)
                        score += "我和我的小伙伴们都惊呆了,\n还能不能一起玩耍了!";

                    wxData.desc = score;

                    return true;
                },
                // 分享被用户自动取消
                cancel : function(resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                    alert("还不赶快分享给好友你的速度???");
                    alert("111???");
					return true;
                },
                // 分享失败了
                fail : function(resp) {
                    // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                    alert("分享失败,不要紧，可能是网络问题，一会儿再试试?");
					return true;
                },
                // 分享成功
                confirm : function(resp) {
                    // 分享成功了，我们是不是可以做一些分享统计呢？
                    //window.location.href='http://192.168.1.128:8080/wwyj/test.html';
                    alert("分享成功");
					return true;
                    
                },
                // 整个分享过程结束
                all : function(resp) {
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                    alert("这是GJ Studio(QQ:2455398128)的第一个游戏,希望你喜欢!");
					return true;
                }
            };

            // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
            Api.shareToFriend(wxData, wxCallbacks);

            // 点击分享到朋友圈，会执行下面这个代码
            Api.shareToTimeline(wxData, wxCallbacks);

            // 点击分享到腾讯微博，会执行下面这个代码
            Api.shareToWeibo(wxData, wxCallbacks);
        });
    }
})