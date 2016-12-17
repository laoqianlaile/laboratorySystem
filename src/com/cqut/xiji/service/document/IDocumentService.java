package com.cqut.xiji.service.document;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.document.Document;

public interface IDocumentService {
	public String addDocument(Document document);
	
	public String deleteDocumentByID(String ID);
	
	public String deleteDocumentByIDs(String[] IDs);
		
	public String updateDocumentByID(Document document,String ID);
	
	public Map<String, Object> getDocumentByConditionWithPaging(int limit, int offset, String order,
			String sort,String documentCode,String documentName,String documentTypeID);

	String getFilePath(String ID);

	List<Map<String, Object>> getFilesInfo(String[] IDs);
}
