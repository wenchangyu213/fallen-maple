System.register("chunks:///_virtual/en.ts",["cc"],(function(e){var a;return{setters:[function(e){a=e.cclegacy}],execute:function(){a._RF.push({},"0eed7sGB5VKPq8aqRJYmWA3","en",void 0);var n=window,s=e("languages",{choose:{tips:"Wave your palm to play"}});n.languages||(n.languages={}),n.languages.en=s,a._RF.pop()}}}));

System.register("chunks:///_virtual/resources",["./en.ts","./zh.ts"],(function(){return{setters:[null,null],execute:function(){}}}));

System.register("chunks:///_virtual/zh.ts",["cc"],(function(e){var n;return{setters:[function(e){n=e.cclegacy}],execute:function(){n._RF.push({},"45b76p0KrFDf5kR4AmZWDHr","zh",void 0);var s=window,a=e("languages",{choose:{tips:"请划动水果进行游戏哈"}});s.languages||(s.languages={}),s.languages.zh=a,n._RF.pop()}}}));

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