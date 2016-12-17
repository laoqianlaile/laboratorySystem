package com.cqut.xiji.service.documentType;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.documentType.DocumentType;

public interface IDocumentTypeService {

	Map<String, Object> getdocumentWithPaging(int limit, int offset,
			String order, String sort, String table);

	int updata(String ID, String documentTypeCode, String documentTypeName,
			String scope);

	int delete(String idstr);

	int add(String documentTypeCode, String documentTypeName, String scope);

	int search(String sdocumentCode, String sdocumenTypeName);
	
	public List<DocumentType> getDocumentTypes();
}
