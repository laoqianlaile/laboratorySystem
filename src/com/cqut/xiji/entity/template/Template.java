package com.cqut.xiji.entity.template;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Template extends Entity{
	
	@ID
	private String ID;
	private String name;
	private String verifyMan;
	private String suggest;
	private String fileID;
	private int state;
	private int templateType;
	private String remarks;
	private Date createTime;
	
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getName() {
		return name;
	}	
	
	public void setName(String name) {
		this.name = name;
	}
	public String getVerifyMan() {
		return verifyMan;
	}	
	
	public void setVerifyMan(String verifyMan) {
		this.verifyMan = verifyMan;
	}
	public String getSuggest() {
		return suggest;
	}	
	
	public void setSuggest(String suggest) {
		this.suggest = suggest;
	}
	public String getFileID() {
		return fileID;
	}	
	
	public void setFileID(String fileID) {
		this.fileID = fileID;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	public int getTemplateType() {
		return templateType;
	}	
	
	public void setTemplateType(int templateType) {
		this.templateType = templateType;
	}
	public String getRemarks() {
		return remarks;
	}	
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "Template [" +  "ID=" + ID  + ", " +  "name=" + name  + ", " +  "verifyMan=" + verifyMan  + ", " +  "suggest=" + suggest  + ", " +  "fileID=" + fileID  + ", " +  "state=" + state  + ", " +  "templateType=" + templateType  + ", " +  "remarks=" + remarks  + ", "   + "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "template";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

	
}
