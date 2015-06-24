window.onload = function (){

	var aLi = $('Tree').getElementsByTagName('li');
	var iLen = aLi.length;
	var iH = aLi[0].firstChild.offsetHeight;//闭合高度

	for(var i = 0; i < iLen; i++){
		var obj = aLi[i].firstChild.firstChild;//<i>
		aLi[i].status = false;	//状态:展开true, 闭合false
		bind(obj, 'click', fnClick);
	};

	/**分割**/

	function fnClick(){
		if(this.status){
			setHeight(this, true);//闭合
			this.status = false;
			this.parentNode.className = 'tree-hide';
		}else{
			setHeight(this, false);//展开
			this.status = true;
			this.parentNode.className = 'tree-show';
		}
		
	};

	function setHeight(obj, status){

		var oNext = getNextSibling(obj.parentNode);//<ul>

		if(!oNext)return;

		var oNChild = oNext.children;
		var oParent = obj.parentNode.parentNode;
		var oRecursion = getPreviousSibling(oParent.parentNode) ? getPreviousSibling(oParent.parentNode).firstChild : null;//<i>
		
		var iLen = oNChild.length;
		var iAttrH = 0;
		var iSum = 0;

		for(var i = 0; i < iLen; i++){
			iAttrH += oNChild[i].offsetHeight;
		};

		status ? iSum = iH : iSum = iH + iAttrH;

		oNext.style.height = iAttrH + 'px';//<ul>
		oParent.style.height = iSum + 'px';//<li>

		if(oRecursion){
			setHeight(oRecursion)
		}else{
			return;
		}
	};



};
/**end**/

function $(selector){//选择器
	return document.getElementById(selector);
};

function getNextSibling(obj){//获取下一个兄弟节点
	var o = obj.nextSibling;
	o && o.nodeType!=1 ? o = o.nextSibling : false;
	return o;
};

function getPreviousSibling(obj){//获取上一个兄弟节点
	var o = obj.previousSibling;
	o && o.nodeType!=1 ? o = o.previousSibling : false;
	return o;
};

function bind(obj, event, fn){//事件绑定
	window.attachEvent ? obj.attachEvent('on'+event, fn) : obj.addEventListener(event, fn, false);
};

function unbind(obj, event, fn){//删除事件绑定
	window.detachEvent ? obj.detachEvent('on'+event, fn) : obj.removeEventListener(event, fn, false);
};

function animate(obj, attr, time, fn){//运动
	obj.timer = null;	//存放定时器
}