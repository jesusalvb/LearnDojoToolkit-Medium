//>>built
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,on,_f,_10,_11,win,_12){
if(!_d.isAsync){
_f(0,function(){
var _13=["dijit/_base/manager"];
_1(_13);
});
}
var _14={};
function _15(obj){
var ret={};
for(var _16 in obj){
ret[_16.toLowerCase()]=true;
}
return ret;
};
function _17(_18){
return function(val){
_8[val?"set":"remove"](this.domNode,_18,val);
this._set(_18,val);
};
};
function _19(a,b){
return a===b||(a!==a&&b!==b);
};
return _6("dijit._WidgetBase",_10,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_17("lang"),dir:"",_setDirAttr:_17("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:_4.blankGif||_1.toUrl("dojo/resources/blank.gif"),postscript:function(_1a,_1b){
this.create(_1a,_1b);
},create:function(_1c,_1d){
this.srcNodeRef=_7.byId(_1d);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_1c){
this.params=_1c;
_e.mixin(this,_1c);
}
this.postMixInProperties();
if(!this.id){
this.id=_12.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_12.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _1e=this.srcNodeRef;
if(_1e&&_1e.parentNode&&this.domNode!==_1e){
_1e.parentNode.replaceChild(this.domNode,_1e);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _1f=this.constructor,_20=_1f._setterAttrs;
if(!_20){
_20=(_1f._setterAttrs=[]);
for(var _21 in this.attributeMap){
_20.push(_21);
}
var _22=_1f.prototype;
for(var _23 in _22){
if(_23 in this.attributeMap){
continue;
}
var _24="_set"+_23.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_24 in _22){
_20.push(_23);
}
}
}
_2.forEach(_20,function(_25){
if(this.params&&_25 in this.params){
}else{
if(this[_25]){
this.set(_25,this[_25]);
}
}
},this);
for(var _26 in this.params){
this.set(_26,this[_26]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||_a.create("div");
}
if(this.baseClass){
var _27=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_27=_27.concat(_2.map(_27,function(_28){
return _28+"Rtl";
}));
}
_9.add(this.domNode,_27);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_2.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&_e.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_29){
this._beingDestroyed=true;
this.destroyDescendants(_29);
this.destroy(_29);
},destroy:function(_2a){
this._beingDestroyed=true;
this.uninitialize();
var c;
while((c=this._connects.pop())){
c.remove();
}
var w;
while((w=this._supportingWidgets.pop())){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
}
this.destroyRendering(_2a);
_12.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_2b){
if(this.bgIframe){
this.bgIframe.destroy(_2b);
delete this.bgIframe;
}
if(this.domNode){
if(_2b){
_8.remove(this.domNode,"widgetId");
}else{
_a.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_2b){
_a.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_2c){
_2.forEach(this.getChildren(),function(_2d){
if(_2d.destroyRecursive){
_2d.destroyRecursive(_2c);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_2e){
var _2f=this.domNode;
if(_e.isObject(_2e)){
_c.set(_2f,_2e);
}else{
if(_2f.style.cssText){
_2f.style.cssText+="; "+_2e;
}else{
_2f.style.cssText=_2e;
}
}
this._set("style",_2e);
},_attrToDom:function(_30,_31,_32){
_32=arguments.length>=3?_32:this.attributeMap[_30];
_2.forEach(_e.isArray(_32)?_32:[_32],function(_33){
var _34=this[_33.node||_33||"domNode"];
var _35=_33.type||"attribute";
switch(_35){
case "attribute":
if(_e.isFunction(_31)){
_31=_e.hitch(this,_31);
}
var _36=_33.attribute?_33.attribute:(/^on[A-Z][a-zA-Z]*$/.test(_30)?_30.toLowerCase():_30);
_8.set(_34,_36,_31);
break;
case "innerText":
_34.innerHTML="";
_34.appendChild(win.doc.createTextNode(_31));
break;
case "innerHTML":
_34.innerHTML=_31;
break;
case "class":
_9.replace(_34,_31,this[_30]);
break;
}
},this);
},get:function(_37){
var _38=this._getAttrNames(_37);
return this[_38.g]?this[_38.g]():this[_37];
},set:function(_39,_3a){
if(typeof _39==="object"){
for(var x in _39){
this.set(x,_39[x]);
}
return this;
}
var _3b=this._getAttrNames(_39),_3c=this[_3b.s];
if(_e.isFunction(_3c)){
var _3d=_3c.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _3e=this.focusNode&&!_e.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_3e].tagName,_3f=_14[tag]||(_14[tag]=_15(this[_3e])),map=_39 in this.attributeMap?this.attributeMap[_39]:_3b.s in this?this[_3b.s]:((_3b.l in _3f&&typeof _3a!="function")||/^aria-|^data-|^role$/.test(_39))?_3e:null;
if(map!=null){
this._attrToDom(_39,_3a,map);
}
this._set(_39,_3a);
}
return _3d||this;
},_attrPairNames:{},_getAttrNames:function(_40){
var apn=this._attrPairNames;
if(apn[_40]){
return apn[_40];
}
var uc=_40.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[_40]={n:_40+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(_41,_42){
var _43=this[_41];
this[_41]=_42;
if(this._watchCallbacks&&this._created&&!_19(_42,_43)){
this._watchCallbacks(_41,_43,_42);
}
},on:function(_44,_45){
return _3.after(this,this._onMap(_44),_45,true);
},_onMap:function(_46){
var _47=this.constructor,map=_47._onMap;
if(!map){
map=(_47._onMap={});
for(var _48 in _47.prototype){
if(/^on/.test(_48)){
map[_48.replace(/^on/,"").toLowerCase()]=_48;
}
}
}
return map[_46.toLowerCase()];
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getChildren:function(){
return this.containerNode?_12.findWidgets(this.containerNode):[];
},getParent:function(){
return _12.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_49,_4a){
var _4b=_5.connect(obj,_49,this,_4a);
this._connects.push(_4b);
return _4b;
},disconnect:function(_4c){
var i=_2.indexOf(this._connects,_4c);
if(i!=-1){
_4c.remove();
this._connects.splice(i,1);
}
},subscribe:function(t,_4d){
var _4e=_11.subscribe(t,_e.hitch(this,_4d));
this._connects.push(_4e);
return _4e;
},unsubscribe:function(_4f){
this.disconnect(_4f);
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_b.isBodyLtr();
},isFocusable:function(){
return this.focus&&(_c.get(this.domNode,"display")!="none");
},placeAt:function(_50,_51){
if(_50.declaredClass&&_50.addChild){
_50.addChild(this,_51);
}else{
_a.place(this.domNode,_50,_51);
}
return this;
},getTextDir:function(_52,_53){
return _53;
},applyTextDir:function(){
},defer:function(fcn,_54){
var _55=setTimeout(_e.hitch(this,function(){
if(!_55){
return;
}
_55=null;
if(!this._destroyed){
_e.hitch(this,fcn)();
}
}),_54||0);
return {remove:function(){
if(_55){
clearTimeout(_55);
_55=null;
}
return null;
}};
}});
});
