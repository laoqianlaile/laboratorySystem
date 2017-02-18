$(function() {
	setTimeout(function() {
		$.post("fileOperateController/deleteOnlinePreviewFile.do");
	}, 1500);
});

function turnBack() {
	window.history.back(-1);
}
