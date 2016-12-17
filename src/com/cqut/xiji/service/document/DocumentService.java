package com.cqut.xiji.service.document;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.document.Document;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.base.SearchService;

@Service
public class DocumentService extends SearchService implements IDocumentService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "document";
	}

	@Override
	public String getBasePrimaryKey() {
		return "document.ID";
	}

	@Override
	public String addDocument(Document document) {
		return entityDao.save(document) == 1 ? "true" : "false";
	}


	@Override
	public String deleteDocumentByID(String ID) {
		//删除相关联文件
		int count = entityDao.deleteByCondition(" belongtoID = '" + ID + "'", FileInformation.class);
		
		//删除该条记录
		count += entityDao.deleteByID(ID, Document.class);
		return count == 2 ? "true" : "false";
	}


	@Override
	public String deleteDocumentByIDs(String[] IDs){
		String filesids = "";
		if (IDs.length > 0) {
			filesids = "'"+IDs[0]+"'";
		}
		if (IDs.length >= 2) {
			for (int i = 1; i < IDs.length; i++) {
				filesids += ",'" + IDs[i]+"'";
			}
		}
		for(int i = 0; i < IDs.length; i++){
			entityDao.deleteByCondition(" belongtoID in (" + filesids + ")", FileInformation.class);
		}
		return entityDao.deleteEntities(IDs, Document.class) == 1 ? "true" : "false";
	}
	
	@Override
	public String updateDocumentByID(Document document, String ID) {
		return entityDao.updatePropByID(document, ID) == 1 ? "true" : "false";
	}

	@Override
	public Map<String, Object> getDocumentByConditionWithPaging(int limit,
			int offset, String order, String sort, String documentCode,
			String documentName, String documentTypeID) {
		String condition = " 1 = 1";
		int index = limit;
		int pageNum = offset / limit;
		if(documentCode != null && !documentCode.trim().equalsIgnoreCase("")){
			condition += " and documentCode = '" + documentCode + "' ";
		} if(documentName != null && !documentName.trim().equalsIgnoreCase("")){
			condition += " and documentName = '" + documentName + "' ";
		}if(documentTypeID != null && !documentTypeID.trim().equalsIgnoreCase("")){
			condition += " and documentTypeID = '" + documentTypeID + "' ";
		}
		
		String joinEntity = " join documentType on documentType.ID = documentTypeID"
								+ " join fileInformation on fileInformation.belongtoID = document.ID";
		List<Map<String, Object>> result = originalSearchWithpaging(
				new String[]{
						"document.ID as documentID",//文档id
						"documentCode",//文档编码
						"documentName",//文档名称
						"description",//文档描述
						"documentTypeID",//文档类别ID
						"documentTypeName",//文档类别名称
						"DATE_FORMAT(saveTime,'%Y-%m-%d  %H:%i:%s') AS saveTime",//保存日期
						"fileInformation.ID as fileInformationID"//文件ID
					}, "document", joinEntity, null, condition, false, null,
				sort, order, index, pageNum);
		int count = searchDao.getForeignCount("document.ID", "document", 
				" join documentType on documentType.ID = documentTypeID"
				+ " join fileInformation on fileInformation.belongtoID = document.ID",
				null, null, condition);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	/***
	 * 
	 * @description 单文件下载
	 * @author xzp
	 * @created 2016-10-10 下午8:27:28
	 * @param request
	 * @param response
	 * @param ID
	 * @throws IOException
	 */
	@Override
	public String getFilePath(String ID) {
		Map<String, Object> file = baseEntityDao.getByID(ID, "belongtoID",
				"fileInformation");
		
		if (file == null) {
			return "nofile";
		} else {
			String path = (String) file.get("path");
			if (path != null) {
				if (path.length() == 0) {
					return "nofile";
				} else {
					return path;
				}
			} else {
				return "nofile";
			}
		}
	}
	@Override
	public List<Map<String, Object>> getFilesInfo(String[] IDs) {
		String filesids = "";
		List<Map<String, Object>> result = null;
		if (IDs.length > 0) {
			filesids = "'"+IDs[0]+"'";
		}
		if (IDs.length >= 2) {
			for (int i = 1; i < IDs.length; i++) {
				filesids += ",'" + IDs[i]+"'";
			}
		}
		
		String condition = " belongtoID IN " + " ( " + filesids + " )";
		result = baseEntityDao.findByCondition(new String[] { "path","type",
				"fileName" }, condition, "fileInformation");
		return result;
	}

}
