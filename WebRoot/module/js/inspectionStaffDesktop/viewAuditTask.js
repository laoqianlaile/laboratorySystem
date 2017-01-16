/*��ʼ��ҳ��*/
$(function() {
	init();
});

function init () {
	$('#testReportTable').bootstrapTable({
		striped : true,// ���б�ɫЧ��
		pagination : true,// �ڱ����ʾ��ҳ��
		pageSize : 5,// ҳ����������
		pageNumber : 1,// ��ҳҳ��
		pageList : [ 3, 5, 9, 10 ],// ���ÿɹ�ѡ���ҳ����������
		clickToSelect : true,// ����true ���ڵ����ʱ���Զ�ѡ��rediobox �� checkbox
		cache : false,// ���� AJAX ���ݻ���
		sortName : 'task.ID',// ����������
		sortOrder : 'asc',// ��������ʽ
		url : 'taskController/getTaskTestReportWithPaging.do',// ���������ݵļ��ص�ַ
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
			title : '���',
			field : 'Number',
			formatter : function(value, row, index) {
				return index + 1;
			}
		}, {
			field : 'taskCode',// ����ֵ����
			title : '������',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '20%',// ���
		}, {
			field : 'receiptlistCode',// ����ֵ����
			title : '���ӵ����',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '20%'// ���
		},{
			field : 'fileName',// ����ֵ����
			title : '��������',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '20%'// ���
		},{
			field : 'versionNumber',// ����ֵ����
			title : '����汾',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '15%'// ���
		},{
			field : 'sampleName',// ����ֵ����
			title : '��Ʒ����',// ����
			align : 'center',// ˮƽ������ʾ
			valign : 'middle',// ��ֱ������ʾ
			width : '20%'// ���
		} ]
	// ��������,������鿴 �в��� ���
	/* �¼� */
	});
}

