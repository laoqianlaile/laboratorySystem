$(function() {
	setTimeout(function() {
		$.post("fileOperateController/deleteOnlinePreviewFile.do");
	}, 3000);
});

function turnBack() {
	window.history.back(-1);
}
