package com.cqut.xiji.entity.fileInformation;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class FileInformation extends Entity{
	
	@ID
	private String ID;
	private String belongtoID;
	private String fileName;
	private String path;
	private String content;
	private String uploaderID;
	private Date uploadTime;
	private int state;
	private int type;
	private String remarks;
	private String filePassword;
	private String pathPassword;
	
	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getBelongtoID() {
		return belongtoID;
	}	
	
	public void setBelongtoID(String belongtoID) {
		this.belongtoID = belongtoID;
	}
	public String getFileName() {
		return fileName;
	}	
	
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getPath() {
		return path;
	}	
	
	public void setPath(String path) {
		this.path = path;
	}
	public String getContent() {
		return content;
	}	
	
	public void setContent(String content) {
		this.content = content;
	}
	public String getUploaderID() {
		return uploaderID;
	}	
	
	public void setUploaderID(String uploaderID) {
		this.uploaderID = uploaderID;
	}
	public Date getUploadTime() {
		return uploadTime;
	}	
	
	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	public int getType() {
		return type;
	}	
	
	public void setType(int type) {
		this.type = type;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getFilePassword() {
		return filePassword;
	}	
	
	public void setFilePassword(String filePassword) {
		this.filePassword = filePassword;
	}
	public String getPathPassword() {
		return pathPassword;
	}	
	
	public void setPathPassword(String pathPassword) {
		this.pathPassword = pathPassword;
	}
	
	@Override
	public String toString() {
		return "FileInformation [" +  "ID=" + ID  + ", " +  "belongtoID=" + belongtoID  + ", " +  "fileName=" + fileName  + ", " +  "path=" + path  + ", " +  "content=" + content  + ", " +  "uploaderID=" + uploaderID  + ", " +  "uploadTime=" + uploadTime  + ", " +  "state=" + state  + ", " +  "type=" + type  + ", " +  "remarks=" + remarks  + ", " +  "filePassword=" + filePassword  + ", " +  "pathPassword=" + pathPassword  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "fileInformation";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}
}
