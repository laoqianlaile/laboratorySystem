/*
function queryParams(pageReqeust) {
		pageReqeust.artColumn=encodeURI("实验室简介");
		return pageReqeust;
	}*/

$(function() {
	var parame = {};
	parame.artColumn = '实验室简介';
	
	$.ajax({
		url :'articleController/getArticle.do',
		data :parame,
		type : 'POST',// 提交方式
		dataType : 'json',// 返回数据的类型
		success:function(o) {// 后台处理数据成功后的回调函数
			var json = eval(o);	
				
			var dou1 = document.getElementById("m_content").innerHTML = json[0]['artContent'];
			var dou2 = document.getElementById("m_Column").innerHTML =json[0]['artColumn'];
			var dou3 = document.getElementById("m_title").innerHTML =json[0]['artTitle'];
			
		},
		/*error:function(XMLResponse){alert(XMLResponse.responseText)
			console.info(XMLResponse.responseText);}*/
	});
});