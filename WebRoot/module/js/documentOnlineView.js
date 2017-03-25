//返回
function turnBack() {
	window.history.back(-1);
}

// 删除缓存文件
window.onbeforeunload = function() {
	$.ajax({
		url : 'fileOperateController/deleteOnlinePreviewFile.do',
		async : false
	});
}