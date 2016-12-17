package com.cqut.xiji.entity.document;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Document extends Entity{
	
	@ID
	private String ID;
	private String documentCode;
	private String documentName;
	private String description;
	private String path;
	private String documentTypeID;
	private Date saveTime;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getDocumentCode() {
		return documentCode;
	}	
	
	public void setDocumentCode(String documentCode) {
		this.documentCode = documentCode;
	}
	public String getDocumentName() {
		return documentName;
	}	
	
	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}
	public String getDescription() {
		return description;
	}	
	
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPath() {
		return path;
	}	
	
	public void setPath(String path) {
		this.path = path;
	}
	public String getDocumentTypeID() {
		return documentTypeID;
	}	
	
	public void setDocumentTypeID(String documentTypeID) {
		this.documentTypeID = documentTypeID;
	}
	public Date getSaveTime() {
		return saveTime;
	}	
	
	public void setSaveTime(Date saveTime) {
		this.saveTime = saveTime;
	}
	
	@Override
	public String toString() {
		return "Document [" +  "ID=" + ID  + ", " +  "documentCode=" + documentCode  + ", " +  "documentName=" + documentName  + ", " +  "description=" + description  + ", " +  "path=" + path  + ", " +  "documentTypeID=" + documentTypeID  + ", " +  "saveTime=" + saveTime  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "document";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
