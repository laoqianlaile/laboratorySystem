/*$(function() {
	setTimeout(function() {
		$.post("fileOperateController/deleteOnlinePreviewFile.do");
	}, 3000);
});
 */
function turnBack() {
	window.history.back(-1);
}

window.onbeforeunload = function() {
	$.ajax({
		url : 'fileOperateController/deleteOnlinePreviewFile.do',
		async : false
	});
}