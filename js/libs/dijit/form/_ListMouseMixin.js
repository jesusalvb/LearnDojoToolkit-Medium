//>>built
define("dijit/form/_ListMouseMixin",["dojo/_base/declare","dojo/_base/event","dojo/touch","./_ListBase"],function(_1,_2,_3,_4){
return _1("dijit.form._ListMouseMixin",_4,{postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onclick",function(_5){
this._onClick(_5,this._getTarget(_5));
});
this.connect(this.domNode,"onmousedown","_onMouseDown");
this.connect(this.domNode,"onmouseup","_onMouseUp");
this.connect(this.domNode,"onmouseover","_onMouseOver");
this.connect(this.domNode,"onmouseout","_onMouseOut");
},_onClick:function(_6,_7){
this._setSelectedAttr(_7,false);
if(this._deferredClick){
this._deferredClick.remove();
}
this._deferredClick=this.defer(function(){
this._deferredClick=null;
this.onClick(_7);
});
},_onMouseDown:function(_8){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(this._getTarget(_8),false);
},_onMouseUp:function(_9){
this._isDragging=false;
var _a=this._getSelectedAttr();
var _b=this._getTarget(_9);
var _c=this._hoveredNode;
if(_a&&_b==_a){
this.defer(function(){
this._onClick(_9,_a);
});
}else{
if(_c){
this.defer(function(){
this._onClick(_9,_c);
});
}
}
},_onMouseOut:function(){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
if(this._getSelectedAttr()==this._hoveredNode){
this.onSelect(this._hoveredNode);
}
this._hoveredNode=null;
}
if(this._isDragging){
this._cancelDrag=(new Date()).getTime()+1000;
}
},_onMouseOver:function(_d){
if(this._cancelDrag){
var _e=(new Date()).getTime();
if(_e>this._cancelDrag){
this._isDragging=false;
}
this._cancelDrag=null;
}
var _f=this._getTarget(_d);
if(!_f){
return;
}
if(this._hoveredNode!=_f){
if(this._hoveredNode){
this._onMouseOut({target:this._hoveredNode});
}
if(_f&&_f.parentNode==this.containerNode){
if(this._isDragging){
this._setSelectedAttr(_f,false);
}else{
this._hoveredNode=_f;
this.onHover(_f);
}
}
}
}});
});