
var tool=new Tool();
var qzq= {
    show: function () {
        var oDiv = DOM.getElesByClass("nav-left-left")[0];
        var data = jsonData;
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            var str="";
            var oLi=document.createElement ("li");
            var oDivN=document.createElement ("div");
            oDivN.className="nav-left-left-one  true-qzq";
            var oDiv1=document.createElement ("div");
            var oDivM=document.createElement("div");
            oDivM.style.display="none";
            oDivM.className="nav-left-float true-qzq";
            var ul=document.createElement("ul");
            for (var key in cur) {
                var phone=cur[key];
                for(var g=0;g<phone.length;g++){
                    if(g==0){
                        for(var j=0;j<phone[0]["type"].length;j++){
                            if(j==0){
                                var a1=document.createElement("a");
                                a1.innerHTML =phone[0]["type"][0];
                                var br1=document.createElement("br");
                                oDivN.appendChild (a1);
                                oDivN.appendChild (br1);
                            }else{
                                str+="<a href='###'>"+phone[0]["type"][j]+"</a>";

                            }
                        }
                        oDiv1.innerHTML=str;
                        oDivN.appendChild (oDiv1);
                        str="";
                    }else if(g==1){
                        for(var j=0;j<phone[1]["list"].length;j++){
                            str+="<li class='nlf-top' style='position:relative;'><span class='imgs' style='background:url("+ phone[1]["list"][j]["url"]+
                            ")no-repeat 10px 5px;'></span><span>"+phone[1]["list"][j]["name"]+"</span></li>";
                        }
                        ul.innerHTML=str;
                        oDivM.appendChild (ul);
                        str="";
                    }else if(g==2){
                        var oDiv2=document.createElement("div");
                        var ul2=document.createElement("ul");
                        oDiv2.appendChild (ul2);
                        for(var j=0;j<phone[2]["attach"].length;j++){
                            if(j==0){
                                str+="<li class='ps'>"+phone[2]["attach"][0]+"</li>";
                            }else{
                                str+="<li>"+phone[2]["attach"][j]+"</li>";
                            }
                        }
                        ul2.innerHTML =str;
                        oDivM.appendChild (oDiv2);
                        str="";
                    }
                }
            }
            oLi.appendChild (oDivN);
            oLi.appendChild(oDivM);
            oDiv.appendChild(oLi);
        }
        qzq.setPosition();
    },
    setPosition:function(){
        var ul1 = DOM.getElesByClass("nav-left-left")[0];
        var lis=DOM.children (ul1,"li");
        for(var i=0;i<lis.length;i++){
            var cur=lis[i];
            var div1=DOM.children(cur,"div")[0];
            var div2=DOM.children (cur,"div")[1];
            var children_ul=DOM.children(div2,"ul")[0];
            var children_ul_li=DOM.children(children_ul,"li");
            var liH=tool.getCss("height",children_ul_li[0]);
            var lisH1=liH*children_ul_li.length;
            var h2=lisH1;
            var children_div=DOM.children(div2,"div");

            if(children_div&&children_div.length==1){
                var children_div_ul=DOM.children(children_div[0],"ul")[0];
                var children_div_ul_lis=DOM.children(children_div_ul,"li");
                var lisH2=tool.getCss("height",children_div_ul_lis[0])*children_div_ul_lis.length;
                h2+=lisH2;
            }
            var h=div1.clientHeight ;
            var length=lis.length;
            var h1=h*(length-i);
            var h3=h*length;

            //console.log(h1+","+h2+","+h3);
            if(h2<=h1){
                div2.style.top=0 +"px";
            }else if(h2<=h3&&h2>=h1){
                //console.log("a");
                div2.style.top=-(h2-(length-1-i)*h)+78+"px";
            }else if(h2>=h3){
                div2.style.width=tool.getCss("width",div2)*2+"px";
                div2.style.top=0;
            }
        }
    },
    banner_auto:function(){
        var oDiv=DOM.getElesByClass("banner-center-top-width")[0];
        var oAs=DOM.children (oDiv,"a");
        qzq.oDiv_step=qzq.oDiv_step||0;
        window.clearInterval (qzq.oDiv_timer);
        oDiv.timer=null;
        function move(){
            qzq.oDiv_step++;
            if(qzq.oDiv_step>=5){
                qzq.oDiv_step=0;
            }
            qzq._move();
        }
        qzq.oDiv_timer=window.setInterval(move,3000);
    },
    setUlCur:function(){
        var oDiv=DOM.getElesByClass("banner-center-top")[0];
        var oUl=DOM.children (oDiv,"ul")[0];
        var lis=DOM.children (oUl,"li");
        for(var i=0;i<lis.length;i++){
            DOM.removeClass (lis[i],"current");
        }
        DOM.addClass (lis[qzq.oDiv_step],"current");
    },
    _move:function(){
        var oDiv=DOM.getElesByClass("banner-center-top-width")[0];
        var oAs=DOM.children (oDiv,"a");
        for(var i=0;i<oAs.length;i++){
            oAs[i].style.display="none";
        }
        oAs[qzq.oDiv_step].style.opacity=0;
        oAs[qzq.oDiv_step].style.filter="alpha(opacity=0)";
        oAs[qzq.oDiv_step].style.display="block";
        animate(oAs[qzq.oDiv_step],{opacity:1},500);
        qzq.setUlCur();
    },
    leftClick:function(){
        window.clearInterval(qzq.oDiv_timer);
        qzq.oDiv_timer=null;
        qzq.oDiv_step--;
        if(qzq.oDiv_step <0){
            qzq.oDiv_step =4;
        }
        qzq._move();
        window.clearInterval (qzq.oDiv_timer );
        qzq.oDiv_timer=null;

    },
    rightClick:function(){
        window.clearInterval(qzq.oDiv_timer);
        qzq.oDiv_timer=null;
        qzq.oDiv_step++;
        if(qzq.oDiv_step >=5){
            qzq.oDiv_step =0;
        }
        qzq._move();
        window.clearInterval (qzq.oDiv_timer );
        qzq.oDiv_timer=null;
    },
    liClick:function(){
        clearInterval (qzq.oDiv_timer );
        qzq.oDiv_timer =null;
        qzq.oDiv_step =this.index;
        qzq._move();
    },
    _move1:function(){
        var con=document.getElementById("con");
        var inner=DOM.getElesByClass ("con-bottom-wid",con)[0];
        qzq.con_step=qzq.con_step||1;
        qzq.con_step*=-1;
        if(qzq.con_step==-1) {
            animate(inner, {left: qzq.con_step * 1240}, 1000);
        }else{
            animate(inner, {left: 0}, 1000);
        }
    },
    con_auto:function(){
        window.clearInterval (qzq.con_timer);
        qzq._move1();
        qzq.con_timer=window.setInterval(qzq._move1,6000);
    },
    conLeft:function(){
	
        this.style.cursor="pointer";
	this.style.color="#000";
        window.clearInterval (qzq.con_timer);
        qzq.con_timer=null;
        var con=document.getElementById("con");
        var inner=DOM.getElesByClass ("con-bottom-wid",con)[0];
        animate(inner, {left: -1240}, 1000);
        qzq.con_timer =window.setTimeout (function(){
            qzq.con_timer =window.setTimeout (qzq.con_auto ,6000);
        },0);
    },
    conRight:function(){
	
        this.style.cursor="pointer";
		
        window.clearInterval (qzq.con_timer);
        qzq.con_timer=null;
        var con=document.getElementById("con");
        var inner=DOM.getElesByClass ("con-bottom-wid",con)[0];
        animate(inner, {left: 0}, 1000);
    }
}

