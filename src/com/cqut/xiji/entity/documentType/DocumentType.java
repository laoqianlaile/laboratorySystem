package com.cqut.xiji.entity.documentType;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class DocumentType extends Entity{
	
	@ID
	private String ID;
	private String documentTypeCode;
	private String documentTypeName;
	private String scope;
	private Date createTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getDocumentTypeCode() {
		return documentTypeCode;
	}	
	
	public void setDocumentTypeCode(String documentTypeCode) {
		this.documentTypeCode = documentTypeCode;
	}
	public String getDocumentTypeName() {
		return documentTypeName;
	}	
	
	public void setDocumentTypeName(String documentTypeName) {
		this.documentTypeName = documentTypeName;
	}
	public String getScope() {
		return scope;
	}	
	
	public void setScope(String scope) {
		this.scope = scope;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "DocumentType [" +  "ID=" + ID  + ", " +  "documentTypeCode=" + documentTypeCode  + ", " +  "documentTypeName=" + documentTypeName  + ", " +  "scope=" + scope  + ", " +  "createTime=" + createTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "documentType";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
