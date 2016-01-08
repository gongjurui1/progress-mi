
var DOM={};//分类的空间，最基本单例模式的方式
//根据class获取元素
DOM.getCss=function(ele,attr){
	if(typeof getComputedStyle=="function"){
		return parseFloat(getComputedStyle(ele,null)[attr]);
	}else{
		if(attr=="opacity"){
			var val=ele.currentStyle.filter;
			var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
			if(reg.test(val)){
				return parseFloat(RegExp.$1)/100;	
			}else{
				return 1;
			}
		}else{
			return parseFloat(ele.currentStyle[attr]);
		}
	}
}
DOM.getByClass=function(parent,clsName){
    var boxArr=[];
    oElements=parent.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
};
//判断ele有几个哥哥，来获取ele的索引值
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
};
//获取ele的所有兄弟
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
};

//获得ele所有的哥哥
DOM.prevSiblings1=function(ele){
	var a=[];//保存ele所有的哥哥用
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			a.push(p);
		}
		p=p.previousSibling;
	}
	return a;
	
};

DOM.prevSiblings2=function(ele){
	var a=[];//保存ele所有的哥哥用
	var childNodes=ele.parentNode.childNodes;
	for(var i=0;i<childNodes.length;i++){
		var temp=childNodes[i];
		if(temp==ele)return a;
		if(temp.nodeType===1){
			a.push(temp);
		}
		
	}
	return a;	
};
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
	
};

DOM.nextSiblings2=function(ele){
	var a=[];
	var childNodes=ele.parentNode.childNodes;
	var flag=false;//设一个标识变量，默认为false;一但遇到自己，变为true，就可以执行a.push
	//在变为true之前，都是ele的哥哥
	for(var i=0;i<childNodes.length;i++){
		var temp=childNodes[i];
		if(flag&&temp.nodeType===1){
			a.push(temp);
		}
		if(temp==ele)flag=true;//在遇到自己之前，都是在浪费性能
	}
	return a;	
};

DOM.nextSiblings3=function(ele){
	var a=[];
	var childNodes=ele.parentNode.childNodes;
	//第三种技巧：反向循环，性能更优
	var i=childNodes.length-1;
	while(i>=0){
		var temp=childNodes[i];
		if(temp==ele)return a;//如果if后边只有一句脚本，则可以省略花括号，并且还可以写成一行			
		if(temp.nodeType===1){
			a.push(temp);
		}
		i--;
	}
	return a;
	
};
//获得ele相邻的第一个哥哥元素
DOM.prev=function(ele){
	if(ele.previousElementSibling){//如果浏览器支持这个属性，则直接返回
		return ele.previousElementSibling;
	}	
	//如果不支持上面的代码，则会执行这儿来
	
	for(var p=ele.previousSibling;p;p=p.previousSibling){
		if(p.nodeType===1){
			return p;
		}
	}
	return null;
	
};

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
};

//获得指定标签名的子元素,第二个参数可选
DOM.children=function(parent,tagName){
	var childNodes=parent.childNodes;
	var a=[];
	if(tagName===undefined){//如果第二个参数没有传 获取所有的
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
	
};

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
};
//获取css样式
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
};

//添加样式
DOM.addClass=function(ele,strClass){
	var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
	if(!reg.test(ele.className))
		ele.className+=" "+strClass;
};
//删除样式
DOM.removeClass=function(ele,strClass){
	var reg=new RegExp("(?:^| )"+strClass+"(?: |$)","g");
	ele.className=ele.className.replace(reg,"");
};
DOM.listToArray=function (list){
    try{
        return [].slice.call(list,0);
    }catch(e){
        var a=[];
        for(var i=0;i<list.length;i++){
            a.push(list[i]);
        }
        return a;
    }
};
//insertBefore是相对应的。
DOM.insertAfter=function(oldEle,newEle){

    oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);

};
DOM.preppend=function(parent,child){
    parent.insertBefore(child,parent.firstChild);
};
Animate={};
Animate.slideDown=function(){};
Animate.slideUp=function(){};
Animate.fadeIn=function(){};

/**索引值*****************************************/

DOM.getIndex=function(ele){
    var p=ele.previousSibling;
    var index=0;
    while(p){
        if(p.nodeType===1){
            index++;
        }
        p=p.previousSibling;
    }
    return index;
};

DOM.offset=function(ele){
    var l=ele.offsetLeft;
    var t=ele.offsetTop;
    var p=ele.offsetParent;
    while(p){
        if( window.navigator.userAgent.indexOf("MSIE 8")>-1){
            l+=p.offsetLeft;
            t+=p.offsetTop;

        }else{
            l+=p.offsetLeft+p.clientLeft;
            t+=p.offsetTop+p.clientTop;
        };
        p=p.offsetParent;
    };
    return { left:l,top:t}


};
/***兄弟节点*****************************************/
DOM.siblings=function(ele){
    var a=[];
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){
            a.push(p)
        }
        p=p.previousSibling;
    }
    var next=ele.nextSibling;
    while(next){
        if(next.nodeType===1){
            a.push(next)
        }
        next=next.nextSibling;
    }
    return a;
};


/**判断里面有几个孩子****************************************************/
DOM.children=function(ele,strTag){//查找指定标签名为strTag的ele的所有元素子节点，第二个参数可选，如果不写，则表示获得ele元素的子元素
    var nodes=ele.childNodes;
    var a=[];
    if(typeof strTag=="undefined"){

        for(var i=0; i<nodes.length; i++){
            var node=nodes[i];
            if(node.nodeType===1){
                a.push(node);
            }
        }
        return a;
    }else if(typeof strTag=="string"){
        strTag=strTag.toUpperCase();
        for(var i=0; i<nodes.length; i++){
            var node=nodes[i];
            if(node.nodeType===1&&node.tagName==strTag){
                a.push(node);
            }
        }
    }else{
        throw new Error("第二个参数错误")
    }
};
function getElesByClass(strClass){
    strClass=strClass.replace(/^ +| +$/g,"");
    var aClass=strClass.split(/ +/);
    var eles=docuemnt.getElementsByTagName("*");
    for(var i=0; i<aClass.length;i++){
        //eles=byClass(aClass[i],eles)
        var str=aClass[i];
        var reg=new RegExp("(^| )+str+( |$)");
        var a=[];
        for(var j=0; j<eles.length;i++){
            var ele=eles[j];
            if(reg.test(ele.className)){
                a.push(ele);
            }
        }
        eles=a;
    }
    return ele;

}

/*
* 添加到这个元素的弟弟的前面，
* 获得弟弟  如果没有  直接添加到容器的后面
* */
DOM.insetAfter=function(){
    var ele=arguments[0],nele=arguments[1];
        if(this.next(ele)){
            ele.parentNode.insertBefore(nele,this.next(ele))
    }else{
            ele.parentNode.appendChild(nele);
        }
};
//把元素添加在最前面
DOM.preappend=function(){
    var parent=arguments[0],child=arguments[1],child1=parent.firstChild;
    if(child1){
        parent.insertBefore(child,child1);
    }else{
        parent.appendChild(child)
    }
};
//hasclass
 //  当前元素有没有这个类


