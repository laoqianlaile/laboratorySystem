/*��ʼ��ҳ��*/
$(function() {
	init();
});

function init() {
	$('#taskTable').bootstrapTable({
		striped : true,// ���б�ɫЧ��
		pagination : true,// �ڱ��ײ���ʾ��ҳ��
		pageSize : 5,// ҳ����������
		pageNumber : 1,// ��ҳҳ��
		pageList : [3,5],// ���ÿɹ�ѡ���ҳ����������
		clickToSelect : true,// ����true ���ڵ����ʱ���Զ�ѡ��rediobox �� checkbox
		cache : false,// ���� AJAX ���ݻ���
		sortName : 'task.ID',// ����������
		sortOrder : 'asc',// ��������ʽ
		//onDblClickCell : onDblClickCell,
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
		columns : [  {
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

/*��񵥻��¼�*/
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
	window.location.href = window.location.href.split("?")[0].replace(
			'InspectionStaffDesktop.jsp', 'equipmentRegistration.jsp');
}

/* ���س�ʼ���� */
function download() {
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("��ѡ��һ������");
		return;
	}
	var testReportID = data[0].testReportID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportView.jsp') + '?testReportID='+testReportID;
}

/* �ύ��� */
function submit() {
var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("��ѡ��һ������");
		return;
	}
	var testReportID = data[0].testReportID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportView.jsp') + '?testReportID='+testReportID;
}

/* �鿴��������� */
function viewTask() {
	window.location.href = window.location.href.split("?")[0]
	.replace('InspectionStaffDesktop.jsp',
			'viewAuditTask.jsp');
}

/* �鿴���� */
function viewReport() {
var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("��ѡ��һ������");
		return;
	}
	var receiptlistID = data[0].ID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportManage.jsp') + '?ID='+receiptlistID;
}


/* �ϴ����� */
function upload() {
	if(data.length==0 || data.length>1){
		alert("��ѡ��һ������");
		return;
	}
	var receiptlistID = data[0].ID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportManage.jsp') + '?ID='+receiptlistID;
}

