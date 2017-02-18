/**
 * 
 */
var fileObj = {};
fileObj.array= [];
re = new RegExp("\"", "g");
$(function() {
	fileUploadInit();// 初始化文件上传方法
});
//文件上传
function fileUpload(filePath, fileTypeNumber, fileFirstDirectory, fileSecondDirectory,fileThirdDirectory,belongtoID,
		fileOtherInfo, fileRemarks) {
	fileObj.array = [];
	fileObj.path = filePath; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	fileObj.type = fileTypeNumber; // 文件类型
	fileObj.firstDirectoryName = fileFirstDirectory; // 一级目录
	fileObj.secondDirectoryName = fileSecondDirectory; // 二级目录
	fileObj.thirdDirectoryName = fileThirdDirectory //三级目录
	fileObj.belongtoID  = belongtoID;
	fileObj.otherInfo = fileOtherInfo; // 其他参数
	fileObj.remarks = fileRemarks; // 备注
  	$('#file_upload').uploadify('upload', '*');

}



//返回文件ID,延迟执行
function fielIdReturn(){
	return fileObj.array;
}

//上传文件
function fileUploadInit(){

	 $("#file_upload").uploadify({ 
         'async':false,
		 'method':'post',
	        'auto':false,//是否自动上传 true or false
	        
	        'successTimeout':99999,//超时时间上传成功后，将等待服务器的响应时间。在此时间后，若服务器未响应，则默认为成功(因为已经上传,等待服务器的响应) 单位：秒
	        
		    'onUploadStart':function(file) {
			$("#file_upload").uploadify("settings", "formData", {
				firstDirectory:fileObj.firstDirectoryName, // 一级路径
				secondDirectory:fileObj.secondDirectoryName,// 二级路径
				thirdDirectory:fileObj.thirdDirectoryName,// 三级路径
				TypeNumber : fileObj.type, // 文件类型,必须
				belongtoID : fileObj.belongtoID,
				content : fileObj.otherInfo,// 文件内容描述
				remark : fileObj.remarks// 备注
			});
		    },
		    onCancel:function(file){
		    	/*console.log(file);
		    	fileObj.size = 0;
		    	for(var id in this.queueData.files){
		    		fileObj.size++;
		    		console.log(	fileObj.size);
		    	}
		    	isShowButton($(this.queueData.files).length);
		    	//是否隐藏确定按钮
*/		    },
		    'onSelect':function(file){
//		    	console.log(file);
//		    	console.log(this.queueData.files);
//		    	fileObj.size = 0;
//		    	for(var id in this.queueData.files){
//		    		fileObj.size++;
//		    		console.log(	fileObj.size);
//		    	}
//		    	alert(this.queueData.files.length);
//		    	isShowButton($(this.queueData.files).length);
		    },
		    'swf':"module/js/uploadify.swf", //flash
		    
	        'queueID':'uploadfileQueue', //文件选择后的容器div的id值 
	        
	        'fileObjName':'files', //将要上传的文件对象的名称 必须与后台controller中抓取的文件名保持一致    
	        
            'uploader':'/laboratorySystem/fileOperateController/upload.do', //上传地址
            
            'width':'100', //浏览按钮的宽度
            
            'height':'32', //浏览按钮的高度 
            
            'fileTypeDesc':'支持的格式:', //在浏览窗口底部的文件类型下拉菜单中显示的文本 
            
            'fileTypeExts':'*.jpg;*.gif;*.png;*.doc;*.docx;*.xls;*.xlsx',//允许上传的文件后缀
            
            'queueSizeLimit':5,//允许上传的文件的最大数量。当达到或超过这个数字，onSelectError事件被触发。

            'onUploadSuccess' : function(file, data, response) {
            	console.log(file);
            	fileObj.data = data.replace(re, "");
    			fileObj.array.push(fileObj.data);
    		},
		    'onUploadError': function(file,errorCode,erorMsg,errorString){
		    	alert("文件："+file.name +" 上传失败 ！");
            },
             
		    'onQueueComplete' : function(queueData) {
		    	alert("上传成功数量："+queueData.uploadsSuccessful );
		    	alert("上传失败数量："+queueData.uploadsErrored  );
		    	queueData.uploadsSuccessful =0;
		    	queueData.uploadsErrored =0;
		    	
		}
	});
}





	 
// 下载一个文件的方法,参数为文件ID
function downOneFile(fileID) {
	$.post("fileOperateController/filecheck.do", {
		ID : fileID
	}, function(result) {
		if (result == '"OK"') {
			window.location.href = "fileOperateController/filedownload.do?ID="
					+ fileID;
		} else {
			alert("下载错误");
		}
	});
}

// 下载选中的所有文件,参数为文件ID
function fileDownAll(ids) {
	window.location.href = "fileOperateController/downloadFiles.do?IDs=" + ids;

}

// 删除所选文件
function deleteFile(ids) {
	jQuery.ajaxSettings.traditional = true;
	$.post("fileOperateController/deleteFiles.do", {
			IDs : ids
		}, function(result) {
			if (result) {
				alert("删除成功");
			} else {
				alert("删除失败");
			}
		});
}
