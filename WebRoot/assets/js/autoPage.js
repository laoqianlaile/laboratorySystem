/**
 * 
 */
$(function(){
	autoHeightWidth();
	
	
});
//自动适应本窗口的大小--高度
function autoHeightWidth(){

	var iframe_element = window.top.frames.document.getElementById("content_frame");
	var iframe_document =iframe_element.contentWindow.document;
	var left_element = window.top.frames.document.getElementById("sidebar");
	var window_top = window.top.window;
	
	var window_height = $(window_top).height();//获取浏览器显示区域的高度；
	var window_width = $(window_top).width();//获取浏览器显示区域的宽度；
 
	var irfame_document_Height = $(iframe_document).height(); //获取文档高度  $(iframe_document).height()
	 
	var irfame_document_Width = $(iframe_document).width();//获取文档宽度
	
	
	if(irfame_document_Height + 221 + 5>= window_height ){ //    221? 53+20  50+12 41 45 --5不可视化
	 
		$(iframe_element).css("height",irfame_document_Height);
		
		$(left_element).css("height", irfame_document_Height+(221 - 45));
	 
	}else{
	
		$(iframe_element).css("height",window_height - 221 - 5); // col-xs-12 有一个5
	
		$(left_element).css("height", window_height  - 45 ); //   logo 45
	 
	}
	console.log(window_top.innerWidth);
	console.log(window_width);  //打开控制台和没有打开控制台不一样
	console.log(irfame_document_Width);
	/*if(irfame_document_Width + 190   >= window_width){
		
		$(iframe_element).css("width",irfame_document_Width);
	}else {
		$(iframe_element).css("width",window_width - 190 + 12 );
	}*/
	
	
}