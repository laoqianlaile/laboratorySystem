function turnBack() {
	$.post("fileOperateController/deleteOnlinePreviewFile.do", function() {
		window.history.back(-1);
	});
}
