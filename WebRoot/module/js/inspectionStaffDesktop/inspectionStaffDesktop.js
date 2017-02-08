/*��ʼ��ҳ��*/
$(function() {
	init();
	initMessage();

});
function init() {
	$('#taskTable').bootstrapTable({
		striped : true,// ���б�ɫЧ��
		pagination : true,// �ڱ��ײ���ʾ��ҳ��
		pageSize : 5,// ҳ����������
		pageNumber : 1,// ��ҳҳ��
		pageList : [ 3, 5 ],// ���ÿɹ�ѡ���ҳ����������
		clickToSelect : true,// ����true ���ڵ����ʱ���Զ�ѡ��rediobox �� checkbox
		cache : false,// ���� AJAX ���ݻ���
		sortName : 'task.ID',// ����������
		sortOrder : 'asc',// ��������ʽ
		// onDblClickCell : onDblClickCell,
		onClickRow : onClickRow,
		url : 'taskController/getTaskInfoWithPaging.do',// ���������ݵļ��ص�ַ
		sidePagination : 'server',// ������������з�ҳ
		contentType : 'application/json',// ���͵������������ݱ�������
		dataType : 'json',// ���������ص���������
		queryParams : function queryParams(params) { // �������������ʱ�������ͨ����д�����ķ�ʽ���һЩ����Ĳ���
			var temp = { // ����ļ������ֺͿ������ı���������һֱ����߸Ķ���������Ҳ��Ҫ�ĳ�һ����
				limit : params.limit, // ҳ���С
				offset : params.offset, // ƫ����
				search : "",// ��ʼ����������
				sort : params.sort, // ��������
				order : params.order, // ��λ���desc��asc��
			};
			return temp;
		},
		queryParamsType : "limit", // ������ʽ,���ͱ�׼��RESTFul���͵Ĳ�������
		selectItemName : '',// radio or checkbox ���ֶ���
		columns : [ {
			radio : true,
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '3%'// ���
		}, {
			title : '���',
			field : 'Number',
			formatter : function(value, row, index) {
				return index + 1;
			}
		}, {
			field : 'ID',// ����ֵ����
			title : 'ID',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : 0,// ���
			visible : false
		}, {
			field : 'receiptlistID',// ����ֵ����
			title : 'receiptlistID',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : 0,// ���
			visible : false
		}, {
			field : 'factoryCode',// ����ֵ����
			title : '��Ʒ�������',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '16%'// ���
		}, {
			field : 'sampleName',// ����ֵ����
			title : '��Ʒ����',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '16%'// ���
		}, {
			field : 'specifications',// ����ֵ����
			title : '�ͺ�',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '16%'// ���
		}, {
			field : 'testName',// ����ֵ����
			title : '�����Ŀ',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '16%'// ���
		}, {
			field : 'employeeName',// ����ֵ����
			title : '�����',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '16%'// ���
		}, {
			field : 'detectState',// ����ֵ����
			title : '״̬',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '16%'// ���
		} ]
	// ��������,������鿴 �в��� ���
	/* �¼� */
	});
}
/* ��񵥻��¼� */
function onClickRow(row) {
	var ID = row.ID;
	$.ajax({
		url : 'taskController/getTaskInfor.do',
		scriptCharset : "utf-8",
		data : {
			"ID" : ID
		},
		dataType : 'json',
		success : function(o) {
			$('input[type="text"]').val("");
			$('#accordingDoc').val("");
			var datas = JSON.parse(o);
			$('#taskCode').val(datas[0].taskCode);
			$('#receiptlistCode').val(datas[0].receiptlistCode);
			$('#accordingDoc').val(datas[0].accordingDoc);
		}
	});
}
/* �豸�Ǽ� */
function register() {
	var data = $('#taskTable').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("��ѡ��һ������");
		return;
	}
	var taskID = data[0].ID;
	window.location.href = window.location.href.replace(
			'inspectionStaffDesktop/inspectionStaffDesktop.jsp',
			'taskManage/taskView.jsp')
			+ '?taskID=' + taskID;
}

/* ���س�ʼ���� */
function download() {
	var data = $('#taskTable').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("��ѡ��һ������");
		return;
	}
	var taskID = data[0].ID;
	window.location.href = window.location.href.replace(
			'inspectionStaffDesktop/inspectionStaffDesktop.jsp',
			'taskManage/taskView.jsp')
			+ '?taskID=' + taskID;
}

/* �ύ��� */
function submit() {
	var data = $('#taskTable').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("��ѡ��һ������");
		return;
	}
	var taskID = data[0].ID;
	window.location.href = window.location.href.replace(
			'inspectionStaffDesktop/inspectionStaffDesktop.jsp',
			'taskManage/taskView.jsp')
			+ '?taskID=' + taskID;
}

/* �鿴��������� */
function viewTask() {
	window.location.href = window.location.href.split("?")[0].replace(
			'inspectionStaffDesktop.jsp', 'viewAuditTask.jsp');
}
/* �鿴���� */
function viewReport() {
	var data = $('#taskTable').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("��ѡ��һ������");
		return;
	}
	var taskID = data[0].ID;
	window.location.href = window.location.href.replace(
			'inspectionStaffDesktop/inspectionStaffDesktop.jsp',
			'taskManage/taskView.jsp')
			+ '?taskID=' + taskID;
}
/* �ϴ����� */
function upload() {
	var data = $('#taskTable').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		alert("��ѡ��һ������");
		return;
	}
	var taskID = data[0].ID;
	window.location.href = window.location.href.replace(
			'inspectionStaffDesktop/inspectionStaffDesktop.jsp',
			'taskManage/taskView.jsp')
			+ '?taskID=' + taskID;
}

function initMessage() {
	var order = 1;
	$('#messageTable')
			.bootstrapTable(
					{
						// ������ĸ߶�height: 500,
						striped : true,// ���б�ɫЧ��
						pagination : true,// �ڱ��ײ���ʾ��ҳ��
						pageSize : 10,// ҳ����������
						pageNumber : 1,// ��ҳҳ��
						pageList : [ 5, 10 ],// ���ÿɹ�ѡ���ҳ����������
						clickToSelect : true,// ����true ���ڵ����ʱ���Զ�ѡ��rediobox ��
												// checkbox
						cache : false,// ���� AJAX ���ݻ���
						// sortName:'message.ID',//����������
						sortOrder : 'asc',// ��������ʽ
						url : 'messageController/getMessageByUserID.do',// ���������ݵļ��ص�ַ
						sidePagination : 'server',// ������������з�ҳ
						contentType : 'application/json',// ���͵������������ݱ�������
						dataType : 'json',// ���������ص���������
						queryParamsType : "limit", // ������ʽ,���ͱ�׼��RESTFul���͵Ĳ�������
						selectItemName : '',// radio or checkbox ���ֶ���
						singleSelect : true,// ��ֹ��ѡ
						columns : [
								{
									title : '��� ',// ����
									align : 'center',// ˮƽ������ʾ
									valign : 'middle',// ��ֱ������ʾ
									width : '5%',// ���
									visible : true,
									formatter : function(value, row, index) {
										checkDataTiding(row);
										return order++;
									}
								},
								{
									field : 'mnID',// ����ֵ����
									title : 'messageNoticeID',// ����
									align : 'center',// ˮƽ������ʾ
									valign : 'middle',// ��ֱ������ʾ
									width : '0',// ���
									visible : false
								},
								{
									field : 'mID',// ����ֵ����
									title : 'message ID',// ����
									align : 'center',// ˮƽ������ʾ
									valign : 'middle',// ��ֱ������ʾ
									width : '0',// ���
									visible : false
								},
								{
									field : 'content',// ����ֵ����
									title : '��Ϣ����',// ����
									align : 'center',// ˮƽ������ʾ
									valign : 'middle',// ��ֱ������ʾ
									width : '50%',// ���
								},
								{
									field : 'createTime',// ����ֵ����
									title : 'ʱ��',// ����
									align : 'center',// ˮƽ������ʾ
									valign : 'middle',// ��ֱ������ʾ
									width : '35%'// ���
								},
								{
									field : 'state',// ����ֵ����
									title : '����',// ����
									align : 'center',// ˮƽ������ʾ
									valign : 'middle',// ��ֱ������ʾ
									width : '10%',// ���
									formatter : function(value, row, index) {
										if (value == "δ�鿴")
											var look = "", edit = "", download = "";
										look = '<button onclick= "lookMessage(\''
												+ row.mnID
												+ '\')" data-toggle="tooltip" data-placement="top" title="ȷ�ϲ鿴"  class="icon-eye-open" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button>';
										return look;
									}
								} ]
					});
}

function checkDataTiding(dataObj) {
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("content") || dataObj.content == null
			|| dataObj.content.trim() == "NULL") {
		dataObj.content = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime.trim() == "NULL") {
		dataObj.createTime = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null
			|| dataObj.state.trim() == "NULL") {
		dataObj.remarks = "δ�鿴";
	}
}

function lookMessage(ID) {
	var isLook = confirm("ȷ���Ѿ��鿴��Ϣ��");
	if (isLook == true) {
		$.ajax({
			url : '/laboratorySystem/messageController/readedMessageByID.do',
			dataType : "json",
			type : "post",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// ���͵������������ݱ�������
			async : false,
			data : {
				messageNoticeID : ID
			},
			success : function(o) {

			},
			error : function() {
			}
		});
		$('#messageTable').bootstrapTable('refresh', null);
	}
}