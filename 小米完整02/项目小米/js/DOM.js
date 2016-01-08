
var DOM={};
DOM.getIndex=function(ele){
	var n=0;
	var prev=ele.previousSibling;	 
	while(prev){
		if(prev.nodeType===1){
			 n++;
		}
		prev=prev.previousSibling;
	}
	return n;	
}
DOM.siblings=function(ele){
	var allEles=ele.parentNode.childNodes;
	var a=[];
	for(var i=0;i<allEles.length;i++){
		var tempEle=allEles[i];
		if(tempEle.nodeType===1&&tempEle!=ele){
			a.push(tempEle);
		}
	}	
	return a;
}

//获得ele所有的哥哥
DOM.prevSiblings1=function(ele){
	var a=[];
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			a.push(p);
		}
		p=p.previousSibling;
	}
	return a;
	
}

DOM.prevSiblings2=function(ele){
	var a=[];
	var childNodes=ele.parentNode.childNodes;
	for(var i=0;i<childNodes.length;i++){
		var temp=childNodes[i];
		if(temp==ele)return a;
		if(temp.nodeType===1){
			a.push(temp);
		}
		
	}
	return a;	
}
//获得ele所有的弟弟
DOM.nextSiblings1=function(ele){
	var a=[];
	var next=ele.nextSibling;
	while(next){
		if(next.nodeType===1){
			a.push(next);	
		}
		next=next.nextSibling;
	}
	return a;
	
}

DOM.nextSiblings2=function(ele){
	var a=[];
	var childNodes=ele.parentNode.childNodes;
	var flag=false;

	for(var i=0;i<childNodes.length;i++){
		var temp=childNodes[i];
		if(flag&&temp.nodeType===1){
			a.push(temp);
		}
		if(temp==ele)flag=true;
	}
	return a;	
}

DOM.nextSiblings3=function(ele){
	var a=[];
	var childNodes=ele.parentNode.childNodes;

	var i=childNodes.length-1;
	while(i>=0){
		var temp=childNodes[i];
		if(temp==ele)return a;			
		if(temp.nodeType===1){
			a.push(temp);
		}
		i--;
	}
	return a;
	
}
//获得ele相邻的第一个哥哥元素
DOM.prev=function(ele){
	if(ele.previousElementSibling){
		return ele.previousElementSibling;
	}	
	
	for(var p=ele.previousSibling;p;p=p.previousSibling){
		if(p.nodeType===1){
			return p;
		}
		;
	}
	return null;
	
}

//获得ele相邻的第一个弟弟元素
DOM.next=function(ele){
	if(ele.nextElementSibling){
		return ele.nextElementSibling;	
	}	
	var n=ele.nextSibling;
	while(n){
		if(n.nodeType===1){
			return n;	
		}
		n=n.nextSibling;
	}
	return null;
}

//获得指定标签名的子元素,第二个参数可选
DOM.children=function(parent,tagName){
	var childNodes=parent.childNodes;
	var a=[];
	if(tagName===undefined){//如果第二个参数没有传
	//上边也可以写成typeof tagName=="undefined"
		for(var i=0;i<childNodes.length;i++){
			var child=childNodes[i];
			if(child.nodeType===1){
				a.push(child);
			}
		}
	}else if(typeof tagName =="string"){//如果第二个参数传了，并且是正确的形式
		for(var i=0;i<childNodes.length;i++){
			var child=childNodes[i];
			//child.nodeName,child.tagName都是大写
			tagName=tagName.toUpperCase();
			if(child.tagName==tagName){//同时满足这两个条件：既是元素节点，标签名又相等
				a.push(child);
			}
		}
	}else{
		throw new Error("第二个参数类型错误");
	}
	return a;
	
}

DOM.children2=function(parent,tagName){
	var childNodes=parent.childNodes;
	if(typeof tagName=="undefined"){
		var reg=/^[A-Z]\w*$/;//没有传第二个参数，则表示把任意子元素都取到。所以这是一个很宽泛的正则
	}else if(typeof tagName=="string"){
		var reg=new RegExp("^"+tagName.toUpperCase()+"$");
	}
	var a=[];
	for(var i=0;i<childNodes.length;i++){
		var child=childNodes[i];		
		if(reg.test(child.nodeName)){
			a.push(child);
		}
	}
	return a;
}

DOM.getElesByClass=function (strClass,context){
	context=context||document;
	if(context.getElementsByClassName){
		return context.getElementsByClassName(strClass);
	}
	strClass=strClass.replace(/^ +| +$/g,"");
	var aClass=strClass.split(/ +/);
	var eles=context.getElementsByTagName("*");
	for(var i=0;i<aClass.length;i++){
		var str=aClass[i];
		var reg=new RegExp("(?:^| )"+str+"(?: |$)");
		
		var a=[];
		for(var j=0;j<eles.length;j++){
			var ele=eles[j];
			if(reg.test(ele.className)){
				 a.push(ele);
			}		
		}
		eles=a;
	}
	return eles;
}


DOM.addClass=function(ele,strClass){
	var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
	if(!reg.test(ele.className))
		ele.className+=" "+strClass;
}

DOM.removeClass=function(ele,strClass){
	var reg=new RegExp("(?:^| )"+strClass+"(?: |$)","g");
	ele.className=ele.className.replace(reg,"");
}



