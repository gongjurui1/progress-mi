function getCss(ele,attr){
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

function setCss(ele,attr,val){
	switch(attr){
		case "opacity":
			ele.style.opacity=val;
			ele.style.filter="alpha(opacity="+val*100+")";
			break;
		case "top":
		case "left":
		case "width":
		case "height":
			ele.style[attr]=val+"px";
			break;
		case "float":
			ele.style.cssFloat=val;
			ele.style.styleFloat=val;
			break;
		default:
			ele.style[attr]=val;		
	}
}
function animate(ele,obj,duration,fnCallback){
	var oBegin={};
	var oChange={};
	var flag=0;
	for(var attr in obj){
		var target=obj[attr];
		var begin=getCss(ele,attr);
		var change=target-begin;
		if(change){
			oBegin[attr]=begin;
			oChange[attr]=change;
			flag++;
		}
	}
	if(flag===0)return;
	
	var interval=13;
	var times=0;
	clearInterval(ele.timer);
	function step(){
		times+=interval;
		if(times>=duration){
			for(var attr in obj){
				var target=obj[attr];
				setCss(ele,attr,target);				
			}
			clearInterval(ele.timer);
			ele.timer=null;
			if(typeof fnCallback=="function"){
				fnCallback.call(ele);
			}
		}else{
			for(var attr in oChange){
				var change=oChange[attr];
				var begin=oBegin[attr];
				var val=times/duration*change+begin;
				setCss(ele,attr,val);	
			}
		}
	}
	ele.timer=window.setInterval(step,interval);
}
