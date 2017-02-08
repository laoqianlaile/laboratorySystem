/**
 * 
 */
/*$(document).ready(function(){
	//alert($(this.document).height());
//	autoHeightWidth();
	setTimeout(autoHeightWidth, 1000);
	
});*/
$(function(){
    var timer;
  //ss  setTimeout(autoHeightWidth, 1000);
    var iframe_element = window.top.frames.document.getElementById("content_frame");
    $(iframe_element).load(function(){
    	//console.log("sucess load");
        if (timer){
            clearInterval(timer);
        }
        //pre_height用于记录上次检查时body的高度
        //mainheight用于获取本次检查时body的高度，并赋予iframe的高度
        var main_height,pre_height;
        var frame_content = $(this);
        timer = setInterval(function(){
        	main_height = frame_content.contents().find("body").height();
            console.warn("pre:"+pre_height);
            console.warn("new:"+main_height);
            if (main_height - 3 != pre_height){
            	
            	pre_height = main_height;
            	autoHeightWidth();
               
               /* frame_content.height(Math.max(mainheight,350));*/
             }
        },500);//每0.5秒检查一次
    });
});

//自动适应本窗口的大小--高度
function autoHeightWidth(){
	console.error("upload");
	var iframe_element = window.top.frames.document.getElementById("content_frame");
	var iframe_document =iframe_element.contentWindow.document;
	var left_element = window.top.frames.document.getElementById("sidebar");
	var window_top = window.top.window;
	
	var window_height = $(window_top).height();//获取浏览器显示区域的高度；
	var window_width = $(window_top).width();//获取浏览器显示区域的宽度；
 
	var irfame_document_Height =$(window.top.frames.document.getElementById("content_frame").contentWindow.document).height(); //获取文档高度  $(iframe_document).height()
	 
	var irfame_document_Width = $(window.top.frames.document.getElementById("content_frame").contentWindow.document).width();//获取文档宽度
	
	console.log("irfame_document_Width");
	/*console.log("w H:"+window_height);
	console.log("d H1:"+irfame_document_Height);*/
	/*irfame_document_Height = $(window.top.frames.document.getElementById("content_frame").contentWindow.document).height();*/
	/*console.log("d H2:"+irfame_document_Height);*/

	if(irfame_document_Height + 221 + 5>= window_height ){ //    221? 53+20  50+12 41 45 --5不可视化
	  
		$(iframe_element).css("height",irfame_document_Height+20);
		
		$(left_element).css("height", irfame_document_Height+(221 - 45));
	 
	}else{
	
		$(iframe_element).css("height",window_height - 221 - 5); // col-xs-12 有一个5
	
		$(left_element).css("height", window_height  - 45 ); //   logo 45
	 
	}
	/*console.log(window_top.innerWidth);
	console.log(window_width); 
	console.log(irfame_document_Width);*/
	/*if(irfame_document_Width + 190   >= window_width){
		
		$(iframe_element).css("width",irfame_document_Width);
	}else {
		$(iframe_element).css("width",window_width - 190 + 12 );
	}*/
	
	
}