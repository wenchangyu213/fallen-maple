System.register("chunks:///_virtual/en.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"0eed7sGB5VKPq8aqRJYmWA3","en",void 0);var l=window,r=e("languages",{backPanel:{title:"Are you sure to return to the main screen?"},fightPanel:{tip:"Sliding joysticks control character movement"},revivePanel:{txt:"Arrival level",revive:"revive",skip:"skip"},settingPanel:{title:"setting",vibrator:"vibrator",music:"music"},settlementPanel:{arrive:"Arrival level",getPower:"Get superpowers"},pausePanel:{title:"Superpower specification",getPower:"Get superpowers"},shopPanel:{title:"There must be something you want to see",refresh:"refresh"},skillPanel:{title:"Pick a superpower you like!",abandon:"abandon",get:"get",refresh:"refresh"},debugPanel:{title:"Debugging interface",chooseLevel:"Selection level",chooseSkill:"Select player skills",clearPlayerData:"Clear player cache",setFrameTime30:"Set to 30 frames",setFrameTime60:"Set to 60 frames",clearPlayerSkill:"Clear all player skills",getAllSkill:"Has all the player's skills"}});l.languages||(l.languages={}),l.languages.en=r,t._RF.pop()}}}));

System.register("chunks:///_virtual/resources",["./en.ts","./zh.ts"],(function(){return{setters:[null,null],execute:function(){}}}));

System.register("chunks:///_virtual/zh.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"45b76p0KrFDf5kR4AmZWDHr","zh",void 0);var l=window,a=e("languages",{backPanel:{title:"确认返回主界面？"},fightPanel:{tip:"滑动摇杆控制角色移动"},revivePanel:{txt:"到达层数",revive:"复活",skip:"跳过"},settingPanel:{title:"设置",vibrator:"震动",music:"音乐"},settlementPanel:{arrive:"到达层数",getPower:"获得超能力"},pausePanel:{title:"超能力说明",getPower:"获得超能力"},shopPanel:{title:"来看看一定有你想要的～",refresh:"刷新"},skillPanel:{title:"选个你喜欢的超能力吧!",abandon:"放弃",get:"获得",refresh:"刷新"},debugPanel:{title:"调试界面",chooseLevel:"选择层级",chooseSkill:"选择玩家技能",clearPlayerData:"清除玩家缓存",setFrameTime30:"设置为30帧",setFrameTime60:"设置为60帧",clearPlayerSkill:"清除玩家所有技能",getAllSkill:"拥有玩家所有技能"}});l.languages||(l.languages={}),l.languages.zh=a,t._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/resources', 'chunks:///_virtual/resources'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});