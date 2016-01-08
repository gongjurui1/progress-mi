/*返回顶*************************************************************/
$(window).scroll(function(e) {
	var dis1=$(window).height();
	var dis2=$(window).scrollTop();
	if(dis2>dis1){
		$('.fanhui').fadeIn();	
	}else{
		$('.fanhui').fadeOut();
	}
	$('.fanhui').click(function(e) {
		$('html,body').stop().animate({scrollTop:0},500)
	});
});



/*轮播*************************************************************/
$(function(){
	var timer=null;
	var num=1;
	
	
	$('ol li').mouseover(function(e) {
        $(this).addClass('current').siblings().removeClass('current');
		//--------------------------------下面是关于ul的工作；
		var index=$(this).index()
		$('.all ul').stop().animate({top:-index*170},500);
		num=index+1;
    });
	
	timer=setInterval(autoplay,1000)
	function autoplay(){
		if(num>4){num=0}
        $('ol li').eq(num).addClass('current').siblings().removeClass('current');
		//--------------------------------下面是关于ul的工作；
		
		$('.all ul').stop().animate({top:-num*170},500)
		num++
	}
	
	$('.display').mouseover(function(e) {
        clearInterval(timer)
    }).mouseout(function(e) {
		clearInterval(timer)
        timer=setInterval(autoplay,1000)
    });
})



/*点图切换*************************************************************/
$(function(){
	var num=0;
	$('.center03 .c03_right').click(function(e) {
        num++;
		if(num>4){num=0};
		$('.center03 ul').stop().animate({left:num*-110},500)
    });	
	$('.center03 .c03_left').click(function(e) {
        num--;
		if(num<0){num=4};
		$('.center03 ul').stop().animate({left:num*-110},500)
    });	
})
/*公告选项卡*************************************************************/

	var oDiv=DOM.getElesByClass("right02")[0];
	var oLis=oDiv.getElementsByTagName("li");
	var oPs=oDiv.getElementsByTagName("p");
	
	function tabChange( current){
		for( var i=0; i<oLis.length; i++){
			oLis.item(i).className="";
			oPs.item(i).className="p0 ";
			}
		
		oLis.item(current).className="li01";
		oPs.item(current).className="p0 current";
		}
               
    for( var i=0; i<oLis.length; i++) {
        oLis.item(i).onmouseover=(function(i){
            return function(){
                tabChange(i)
            }
        })(i)
    }

/*便民服务选项卡*************************************************************/

	var oDivs=DOM.getElesByClass("right03")[0];
	var oLiss=oDivs.getElementsByTagName("li");
	var oDiv=oDivs.getElementsByTagName("div");
	
	function tabChange02( current){
		for( var i=0; i<oLiss.length; i++){
			oLiss.item(i).className="";
			oDiv.item(i).className="forms ";
			}
		
		oLiss.item(current).className="li01";
		oDiv.item(current).className="forms current";
		}
               
    for( var i=0; i<oLiss.length; i++) {
        oLiss.item(i).onmouseover=(function(i){
            return function(){
                tabChange02(i)
            }
        })(i)
    }

/*今日更多选项卡*************************************************************/

	var oDivs01=DOM.getElesByClass("houdong")[0];
	var oSpan=oDivs01.getElementsByTagName("span");
	var oDiv01=oDivs01.getElementsByClassName("fanwei");
	
	function tabChange01( current){
		for( var i=0; i<oSpan.length; i++){
			oDiv01.item(i).className="fanwei ";
			}
		oDiv01.item(current).className="fanwei current";
		}
               
    for( var i=0; i<oSpan.length; i++) {
        oSpan.item(i).onclick=(function(i){
            return function(){
                tabChange01(i)
            }
        })(i)
    }
	/*精彩活动选项卡*************************************************************/

	var oDivs03=DOM.getElesByClass("jingcai")[0];
	var oLis03=oDivs03.getElementsByTagName("li");
	var oDiv03=oDivs03.getElementsByTagName("div");
	
	function tabChange03( current){
		for( var i=0; i< oLis03.length; i++){
			oLis03.item(i).className="";
			oDiv03.item(i).className="jiugongge ";
			}
			oLis03.item(current).className="bian";
		oDiv03.item(current).className="jiugongge current";
		}
               
    for( var i=0; i< oLis03.length; i++) {
         oLis03.item(i).onmouseover=(function(i){
            return function(){
                tabChange03(i)
            }
        })(i)
    }





