System.register("chunks:///_virtual/AutoPlayUIEffect.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,c,o,n;return{setters:[function(t){e=t.inheritsLoose},function(t){c=t.cclegacy,o=t._decorator,n=t.Component}],execute:function(){var r;c._RF.push({},"59cc2GuKjJIt4c1heErKHJF","AutoPlayUIEffect",void 0);var u=o.ccclass;o.property,t("AutoPlayUIEffect",u("AutoPlayUIEffect")(r=function(t){function c(){return t.apply(this,arguments)||this}e(c,t);var o=c.prototype;return o.start=function(){},o.update=function(t){},c}(n))||r);c._RF.pop()}}}));

System.register("chunks:///_virtual/AutoShowParticle.ts",["./rollupPluginModLoBabelHelpers.js","cc","./BasicComponet.ts","./GlobalTmpData.ts","./GlobalPool.ts"],(function(t){var i,e,r,o,a,c,n,s,l,p,u;return{setters:[function(t){i=t.applyDecoratedDescriptor,e=t.inheritsLoose,r=t.initializerDefineProperty,o=t.assertThisInitialized},function(t){a=t.cclegacy,c=t._decorator,n=t.v3,s=t.ParticleSystem},function(t){l=t.BasicComponet},function(t){p=t.GlobalTmpData},function(t){u=t.default}],execute:function(){var h,f,d;a._RF.push({},"91bf4TJ9uZGPqmIeZvSQCD2","AutoShowParticle",void 0);var m=c.ccclass,P=c.property;t("AutoShowParticle",m("AutoShowParticle")((d=i((f=function(t){function i(){for(var i,e=arguments.length,a=new Array(e),c=0;c<e;c++)a[c]=arguments[c];return i=t.call.apply(t,[this].concat(a))||this,r(i,"hideTime",d,o(i)),i.curt=0,i.particle=null,i.particleArr=[],i.tmpPos=n(),i}e(i,t);var a=i.prototype;return a.initSub=function(){this.particle=this.node.getComponent(s),this.particleArr=this.node.getComponentsInChildren(s)},a.setData=function(t){this.curt=0,this.particle&&this.particle.play(),this.particleArr&&this.particleArr.forEach((function(t){t.play()}))},a.reset=function(){this.curt=0,this.particle&&this.particle.stop(),this.particleArr&&this.particleArr.forEach((function(t){t.stop()}))},a.update=function(t){this.curt+=t,this.tmpPos.set(p.Player.wpos).add(p.Player.offset),this.node.setPosition(this.tmpPos),this.curt>=this.hideTime&&(this.particle&&this.particle.stop(),this.particleArr&&this.particleArr.forEach((function(t){t.stop()})),u.put(this.node))},i}(l)).prototype,"hideTime",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),h=f))||h);a._RF.pop()}}}));

System.register("chunks:///_virtual/Effect",["./AutoPlayUIEffect.ts","./AutoShowParticle.ts"],(function(){return{setters:[null,null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/Effect', 'chunks:///_virtual/Effect'); 
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