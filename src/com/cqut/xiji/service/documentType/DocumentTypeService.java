package com.cqut.xiji.service.documentType;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.documentType.DocumentType;
import com.cqut.xiji.entity.timeCheck.TimeCheck;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class DocumentTypeService extends SearchService implements IDocumentTypeService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	private String conditiona2="1=1";

	@Override
	public String getBaseEntityName() {
		return "documentType";
	}

	@Override
	public String getBasePrimaryKey() {
		return "documentType.ID";
	}
	
	@Override
	public Map<String, Object> getdocumentWithPaging(int limit, int offset,String order,String sort,String table) {
		System.out.println("2getSuggestWithPaging22" + "<br />");
		int index = limit;
		int pageNum = offset/limit + 1;
		String tablename = "documenttype";
		String[] properties = new String[]{
				"ID",
				"documentTypeCode",
				"documentTypeName",
				"scope",
				"date_format(createTime, '%Y-%m-%d') as createTime",
		};
		
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, null, null, conditiona2, null, sort, order, index, pageNum);
		int datanum = entityDao.getByCondition(conditiona2, DocumentType.class).size();
		int i = 1;
		for (Map<String, Object> m : result)  
	    { 
			if(i<=datanum){
				m.put("number", i);
				i=i+1;
			}
	    }
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total",datanum);
		map.put("rows",result);
		return map;
	}
	
	@Override
	public int updata(String ID,String documentTypeCode,String documentTypeName,String scope){
		System.out.println("ID="+ID+":documentTypeCode="+documentTypeCode+":documentTypeName="+documentTypeName+":scope="+scope);
		DocumentType documentType = new DocumentType();
		documentType.setDocumentTypeCode(documentTypeCode);
		documentType.setDocumentTypeName(documentTypeName);
		documentType.setScope(scope);
		return entityDao.updatePropByID(documentType,ID);
	}
	
	@Override
	public int delete(String idstr){
		String[] allid = idstr.split(",");
		return entityDao.deleteEntities(allid,DocumentType.class);
	}
	
	@Override
	public int add(String documentTypeCode,String documentTypeName,String scope){
		DocumentType documentType = new DocumentType();
		String id = EntityIDFactory.createId();
		documentType.setID(id);
		documentType.setDocumentTypeCode(documentTypeCode);
		documentType.setDocumentTypeName(documentTypeName);
		documentType.setScope(scope);
		documentType.setCreateTime(new Date());
		return entityDao.save(documentType);
	}
	
	@Override
	public int search(String sdocumentCode,String sdocumenTypeName){
		conditiona2="";
		if((sdocumentCode!=null&&sdocumentCode!="")||(sdocumenTypeName!=null&&sdocumenTypeName!="")){
			if(sdocumentCode!=null&&sdocumentCode!=""){
				conditiona2 = conditiona2 +" and "+"documentTypeCode like '%" + sdocumentCode + "%'";
			};
			if(sdocumenTypeName!=null&&sdocumenTypeName!=""){
				conditiona2 = conditiona2 +" and "+"documentTypeName like '%" + sdocumenTypeName + "%'";
			};
		}else{
			conditiona2 = "1=1";
		}
		return 1;
	}

	@Override
	public List<DocumentType> getDocumentTypes() {
		List<DocumentType> documentTypes = entityDao.getByCondition("1 = 1", DocumentType.class);
		return documentTypes;
	}
}
