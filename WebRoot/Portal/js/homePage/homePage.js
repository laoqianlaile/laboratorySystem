
$(function(){ 
	/*
	 * 首页读取实验室简介
	 * */
	var Introduction = '实验室简介';
	 $.ajax( {
		 data:{'artColumn':Introduction},                  
	     url:'articleController/getArticle.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(msg) {  
    	 if(msg){
	    		var artcontent= "";
	    		var myobj=eval(msg);
	    		artcontent =  "<div class='a'>"+ myobj[0].artContent + "</div>";
	    		var content = document.getElementById("labProfile");
		    	content.innerHTML = artcontent;
		    	content.innerHTML = content.innerHTML.substr(0,500);
	    		$(".a>p").css("margin","0px");
	    		$(".a>p").css("height","233px");
	    		$(".a>p").css("overflow","hidden");
	    		$(".a>p").css("font-size","16px");
	    		$(".a>p").css("font-family", "Microsoft YaHei UI");
	    		$(".a>p>span").css("margin","0px");
	    		$(".a>p>span").css("font-size","16px");
	    		$(".a>p>span").css("font-family", "Microsoft YaHei UI");
	    		$(".a>p>strong").css("margin","0px");
	    		$(".a>p>strong").css("font-size","16px");
	    		$(".a>p>strong").css("font-family", "Microsoft YaHei UI");
		    	content.style.cssText='line-height:29px;font-size:16px;';

	    	}
	 		}
	 });
	 
	 /*
	  * 首页读取热门案例
	  * */
	var hotcase = document.getElementById("hot-case").getAttribute('value');
	 $.ajax( {  
		 data:{'artCaseType':'案例'},
	     url:'articleController/getArticle.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data) {  
    	 if(data){
    		 var hotcase= "";
	    	 var myobj=eval(data);
	    	 var j = 6;
	    	 var n = 0;
	    	 var day = new Date();
	    	 oYear = day.getFullYear(),
             oMonth = day.getMonth()+1,  
             oDay = day.getDate();
	    	 if(myobj.length<=j){
	    		 n = myobj.length;
	    	 }else
	    		 n = j;
	    	 for(var i=0;i<n;i++){
	    		 day.setTime(myobj[i].artCregisattime.time);

	    		 hotcase += "<li class='notices-item' >"+
	    		 "<span>"+"</span>"+"<div class='tittle'>"+
		    	 "<a id='tittle' href="+"Portal/jsp/classicCase/CaseDetails.jsp?articleID="+
		    	 myobj[i].articleID+">"+myobj[i].artTitle.substr(0, 12)+"</a>"+
		    	 "</div>"+"<div class='date' id='date'>"+
		    	 oYear+"-"+oMonth+"-"+oDay+"</div>"+"</li>";
		    	}
	    	 var excellent = document.getElementById("hot-case");
	    	 excellent.innerHTML = hotcase;
	    	
	    	 }
    	 }
	 });
	 
	 /*
	  * 首页读取新闻资讯
	  * */
	 var news = document.getElementById("newslist").getAttribute('value');
	 $.ajax( {  
		 data:{'artColumn':news},
	     url:'articleController/getArticle.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data) {  
    	 if(data){
    		 var newslist= "";
	    	 var myobj=eval(data);
	 
	    	 var j = 7;
	    	 var n = 0;
	    	 var day = new Date();
	    	 oYear = day.getFullYear(),
             oMonth = day.getMonth()+1,  
             oDay = day.getDate();
	    	 if(myobj.length<=j){
	    		 n = myobj.length;
	    	 }else
	    		 n = j;
	    	 for(var i=0;i<n;i++){
	    		 
	    		 day.setTime(myobj[i].artCregisattime.time);
	    		 
	    		 newslist += "<li class='notices-item' >"+"<span>"+"</span>"+"<div class='tittle'>"+
		    	 "<a id='tittle' href="+"Portal/jsp/newsPage/newDetailsPage.jsp?articleID="+myobj[i].articleID+">"+myobj[i].artTitle.substr(0, 12)+
		    	 "</a>"+"</div>"+"<div class='date' id='date'>"+
		    	 oYear+"-"+oMonth+"-"+oDay+"</div>"+"</li>";
		    	}
	    	 var excellent = document.getElementById("newslist");
	    	 excellent.innerHTML = newslist;
	    	
	    	 }
    	 }
	 });
	 
	 /*
	  * 首页读取典型案例
	  * */
	 var classiccase = document.getElementById("classiccase").getAttribute('value');
	 $.ajax( {  
		 data:{'artCaseType':classiccase},
	     url:'articleController/getClassicCase.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data) {  
    	 if(data){
    		 var classiccase= "";
	    	 var myobj=eval(data['rows']);
	    	
	    	 var j = 4;
	    	 var n = 0;
	    	 if(myobj.length<=j){
	    		 n = myobj.length;
	    	 }else
	    		 n = j;
	    	 for(var i=0;i<n;i++){ 
	    		 classiccase += "<li class='case-item' >"+
	    		 "<a href="+"Portal/jsp/classicCase/CaseDetails.jsp?articleID="+myobj[i].articleID+">"+
	    		 "<img class='img-case' src=" + "'" +myobj[i].path + "'" + " onerror='errorImg(this,"+ i+")'" +">"+
	    		 "<div class='case-name'>"+myobj[i].artTitle+"</div>"+
	    		 "</a>"+"</li>";
		    	}
	    	 var excellent = document.getElementById("classiccase");
	    	 excellent.innerHTML = classiccase;
	    	
	    	 }
    	 }
	 });
	 
});

function errorImg(img, i){
	img.src = "Portal/images/indexPic" + i + ".png";
}